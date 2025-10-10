import {defineType, defineField} from 'sanity'
import React from 'react'

// Simple parser to preview markdown tables in Sanity Studio
const parseMarkdownTable = (markdown: string) => {
  if (!markdown || !markdown.trim()) return null

  const lines = markdown
    .trim()
    .split(/\r?\n/) // Handle both \n and \r\n line endings
    .map(line => line.trim())
    .filter(line => line.length > 0)

  if (lines.length < 2) return null

  const rows = lines
    .filter((line, index) => {
      // Skip separator line (the one with dashes like |---|---|)
      if (index === 1 && /^[\s|:\-]+$/.test(line)) return false
      return true
    })
    .map(line => {
      // Split by | and clean up
      const parts = line.split('|').map(cell => cell.trim())
      // Remove first and last if they're empty (from leading/trailing pipes)
      if (parts[0] === '') parts.shift()
      if (parts[parts.length - 1] === '') parts.pop()
      return parts
    })
    .filter(row => row.length > 0)

  return rows.length > 0 ? rows : null
}

// Preview component to display table in Sanity Studio
const TablePreview = (props: any) => {
  const {markdown} = props.value || {}

  if (!markdown) {
    return <div style={{padding: '8px', color: '#999'}}>Empty table - paste markdown here</div>
  }

  const rows = parseMarkdownTable(markdown)

  if (!rows || rows.length === 0) {
    return <div style={{padding: '8px', color: '#999'}}>Invalid table format</div>
  }

  return (
    <div style={{
      overflowX: 'auto',
      margin: '16px 0',
      border: '1px solid #e0e0e0',
      borderRadius: '8px'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '14px'
      }}>
        <thead>
          <tr style={{
            backgroundColor: '#f5f5f5',
            borderBottom: '2px solid #e0e0e0'
          }}>
            {rows[0].map((cell: string, cellIndex: number) => (
              <th
                key={cellIndex}
                style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  borderRight: cellIndex < rows[0].length - 1 ? '1px solid #e0e0e0' : 'none'
                }}
              >
                {cell || '—'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.slice(1).map((row: string[], rowIndex: number) => (
            <tr key={rowIndex} style={{
              backgroundColor: 'white',
              borderBottom: '1px solid #e0e0e0'
            }}>
              {row.map((cell: string, cellIndex: number) => (
                <td
                  key={cellIndex}
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    borderRight: cellIndex < row.length - 1 ? '1px solid #e0e0e0' : 'none'
                  }}
                >
                  {cell || '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'markdown',
      title: 'Markdown Table',
      type: 'text',
      rows: 10,
      description: 'Paste your markdown table here (e.g., | Header 1 | Header 2 |)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Table Caption',
      type: 'string',
      description: 'Optional caption for the table (helps with accessibility)',
    }),
  ],
  preview: {
    select: {
      markdown: 'markdown',
      caption: 'caption',
    },
    prepare({markdown, caption}) {
      const rows = parseMarkdownTable(markdown || '')
      const rowCount = rows?.length || 0
      const colCount = rows?.[0]?.length || 0
      return {
        title: caption || `Table (${rowCount} rows × ${colCount} columns)`,
        subtitle: caption ? `${rowCount} rows × ${colCount} columns` : 'Markdown table',
      }
    },
  },
})
