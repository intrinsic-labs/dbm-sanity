import {defineField, defineType} from 'sanity'

/**
 * Citation Type Schema
 *
 * This schema defines citations/references that can be added to blog posts.
 * Citations are stored as objects within each post's references array.
 *
 * Supports multiple citation types with schema.org mapping:
 * - ScholarlyArticle (journal articles, peer-reviewed papers)
 * - Book (books, monographs)
 * - WebPage (websites, blogs)
 * - GovernmentDocument (official government sources)
 * - Dataset (research data, statistics)
 */
export const citationType = defineType({
  name: 'citation',
  title: 'Citation',
  type: 'object',
  fields: [
    // ===== CITATION TYPE =====
    defineField({
      name: 'citationType',
      title: 'Citation Type',
      type: 'string',
      description: 'Type of source - determines schema.org markup',
      options: {
        list: [
          {title: 'Journal Article / Peer-Reviewed Paper', value: 'scholarlyArticle'},
          {title: 'Book / Monograph', value: 'book'},
          {title: 'Website / Blog Post', value: 'webPage'},
          {title: 'Government Document', value: 'governmentDocument'},
          {title: 'Dataset / Statistics', value: 'dataset'}
        ]
      },
      initialValue: 'webPage',
      validation: Rule => Rule.required()
    }),

    // ===== BASIC BIBLIOGRAPHIC INFO =====
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the work',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of authors (format: "Last, First" or "Last, F.")',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'publicationYear',
      title: 'Publication Year',
      type: 'number',
      description: 'Year published',
      validation: Rule => Rule.required().integer().min(1900).max(new Date().getFullYear())
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      description: 'Publisher name (for books) or journal name (for articles)'
    }),

    // ===== URLS & IDENTIFIERS =====
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the source',
      validation: Rule => Rule.uri({
        allowRelative: false,
        scheme: ['http', 'https']
      })
    }),
    defineField({
      name: 'doi',
      title: 'DOI',
      type: 'string',
      description: 'Digital Object Identifier (e.g., 10.1234/example)',
      validation: Rule => Rule.custom((doi) => {
        if (!doi) return true // Optional field
        // Basic DOI validation
        if (!/^10\.\d{4,}\/\S+$/.test(doi)) {
          return 'DOI should be in format: 10.xxxx/xxxxx'
        }
        return true
      })
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      description: 'International Standard Book Number (for books)',
      hidden: ({parent}) => parent?.citationType !== 'book'
    }),
    defineField({
      name: 'issn',
      title: 'ISSN',
      type: 'string',
      description: 'International Standard Serial Number (for journals)',
      hidden: ({parent}) => parent?.citationType !== 'scholarlyArticle'
    }),

    // ===== ADDITIONAL PUBLICATION INFO =====
    defineField({
      name: 'volume',
      title: 'Volume',
      type: 'string',
      description: 'Volume number (for journals)',
      hidden: ({parent}) => parent?.citationType !== 'scholarlyArticle'
    }),
    defineField({
      name: 'issue',
      title: 'Issue',
      type: 'string',
      description: 'Issue number (for journals)',
      hidden: ({parent}) => parent?.citationType !== 'scholarlyArticle'
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'string',
      description: 'Page numbers (e.g., "123-145" or "45")',
      hidden: ({parent}) => !['scholarlyArticle', 'book'].includes(parent?.citationType || '')
    }),
    defineField({
      name: 'edition',
      title: 'Edition',
      type: 'string',
      description: 'Edition (e.g., "2nd ed.")',
      hidden: ({parent}) => parent?.citationType !== 'book'
    }),
    defineField({
      name: 'accessDate',
      title: 'Access Date',
      type: 'date',
      description: 'When you accessed this source (important for web sources)',
      hidden: ({parent}) => !['webPage', 'dataset'].includes(parent?.citationType || '')
    }),

    // ===== SEO ENHANCEMENT FIELDS =====
    defineField({
      name: 'seoWeight',
      title: 'SEO Authority Weight',
      type: 'number',
      description: 'Authority rating (1-5): How authoritative is this source?',
      validation: Rule => Rule.min(1).max(5).integer(),
      initialValue: 3,
      options: {
        list: [
          {title: '⭐ Low Authority (.com blog, opinion piece)', value: 1},
          {title: '⭐⭐ Moderate Authority (established .com, news site)', value: 2},
          {title: '⭐⭐⭐ Good Authority (.org, industry publication)', value: 3},
          {title: '⭐⭐⭐⭐ High Authority (.edu, .gov, established journal)', value: 4},
          {title: '⭐⭐⭐⭐⭐ Highest Authority (peer-reviewed, major institution)', value: 5}
        ]
      }
    }),
    defineField({
      name: 'keywordRelevance',
      title: 'Target Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Keywords this citation supports in your article',
      options: {layout: 'tags'}
    }),
    defineField({
      name: 'qualityScore',
      title: 'Citation Quality Score',
      type: 'number',
      description: 'Auto-calculated quality score (0-100) based on authority, recency, and completeness',
      readOnly: true,
      hidden: true // Hide for now, will be calculated by validation hook later
    }),

    // ===== INTERNAL NOTES =====
    defineField({
      name: 'internalNote',
      title: 'Internal Note',
      type: 'text',
      rows: 2,
      description: 'Private notes about this citation (not displayed publicly)'
    })
  ],
  preview: {
    select: {
      title: 'title',
      authors: 'authors',
      year: 'publicationYear',
      type: 'citationType',
      weight: 'seoWeight'
    },
    prepare({title, authors, year, type, weight}) {
      const authorString = authors?.[0]
        ? authors.length > 1
          ? `${authors[0]} et al.`
          : authors[0]
        : 'No author'

      const typeEmoji = {
        scholarlyArticle: '📄',
        book: '📚',
        webPage: '🌐',
        governmentDocument: '🏛️',
        dataset: '📊'
      }[type || 'webPage'] || '📎'

      const stars = '⭐'.repeat(weight || 3)

      return {
        title: `${typeEmoji} ${title}`,
        subtitle: `${authorString} (${year}) | ${stars}`
      }
    }
  }
})
