import {defineArrayMember, defineType, defineField} from 'sanity'
import React from 'react'

// Decorators for superscript and subscript
const SuperIcon = () => (
  <div>
    x<sup>2</sup>
  </div>
)
const SuperDecorator = (props: any) => <sup>{props.children}</sup>
const SubIcon = () => (
  <div>
    x<sub>2</sub>
  </div>
)
const SubDecorator = (props: any) => <sub>{props.children}</sub>

/**
 * This is the schema definition for the rich text fields used for
 * portable text content.
 * You can add additional types to this array if you want to define
 * custom components inside the content.
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what text styles are available for content editors
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      // Marks let you mark up inline text in the block editor
      marks: {
        // Decorators usually describe a single property – e.g. emphasis or code
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
          {title: 'Sub', value: 'sub', icon: SubIcon, component: SubDecorator},
          {title: 'Super', value: 'super', icon: SuperIcon, component: SuperDecorator},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) => Rule.uri({allowRelative: true}),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },

          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal link',
            icon: () => 'IL', // Or use custom icon
            fields: [
              {
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{type: 'post'}],
                options: {
                  // This ensures you can only link to documents
                  // that have translations set up
                  filter: ({document}) => {
                    // Optional: filter to only show documents in the same language
                    return {
                      filter: 'language == $language',
                      params: {
                        language: document.language,
                      },
                    }
                  },
                },
              },
            ],
          },
        ],
      },
    }),
    // Enhanced image component for inline images
    defineArrayMember({
      type: 'image',
      name: 'inlineImage',
      title: 'Inline Image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and SEO (required)',
          validation: (Rule) =>
            Rule.required()
              .min(10)
              .max(125)
              .warning('Alt text should be 10-125 characters for optimal SEO'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional caption displayed below the image',
          validation: (Rule) => Rule.max(200),
        }),
        defineField({
          name: 'loading',
          type: 'string',
          title: 'Loading Behavior',
          description: 'How the image should be loaded',
          options: {
            list: [
              {title: 'Lazy (default)', value: 'lazy'},
              {title: 'Eager (above fold)', value: 'eager'},
            ],
          },
          initialValue: 'lazy',
        }),
        defineField({
          name: 'size',
          type: 'string',
          title: 'Display Size',
          description: 'How large should this image appear?',
          options: {
            list: [
              {title: 'Full Width (default)', value: 'full'},
              {title: 'Large (75%)', value: 'large'},
              {title: 'Medium (50%)', value: 'medium'},
              {title: 'Small (25%)', value: 'small'},
            ],
          },
          initialValue: 'full',
        }),
      ],
    }),
    // Infographic reference
    defineArrayMember({
      type: 'reference',
      name: 'infographicReference',
      title: 'Infographic',
      to: [{type: 'infographic'}],
      options: {
        // Filter infographics that have content in the current document's language
        filter: ({document}) => {
          if (document?.language) {
            return {
              filter: `count(title[language == $language]) > 0`,
              params: {
                language: document.language,
              },
            }
          }
          // Fallback: show infographics that have English content
          return {
            filter: `count(title[language == "en"]) > 0`,
          }
        },
      },
    }),
    // YouTube video embed
    defineArrayMember({
      type: 'youtube',
      name: 'youtubeEmbed',
      title: 'YouTube Video',
    }),
  ],
})
