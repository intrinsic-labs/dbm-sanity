import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief description of the post (140-280 characters)',
      validation: Rule => Rule.required().min(140).max(280)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Cover Image Alt Text',
      type: 'string',
      description: 'Alternative text for the cover image (important for accessibility)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      description: 'When the post was published',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time - auto-calculated or manual override'
    }),
    defineField({
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      description: 'Track content freshness for SEO'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Puppy Training', value: 'puppy'},
          {title: 'Senior Dog', value: 'senior-dog'},
          {title: 'Physical Conditioning', value: 'physical-conditioning'},
          {title: 'Recovery/Rehabilitation', value: 'recovery-rehabilitation'},
          {title: 'Mental Stimulation', value: 'mental-stimulation'},
          {title: 'Supplements', value: 'supplements'},
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'}
    }),
    defineField({
      name: 'meta',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Custom meta description for SEO (max 160 characters)',
      validation: Rule => Rule.max(160)
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false
    }),
    // IMPORTANT: Language field managed by internationalization plugin
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'coverImage',
      authorName: 'author.name',
      language: 'language'
    },
    prepare({title, subtitle, media, authorName, language}) {
      return {
        title: `${title} ${language ? `(${language.toUpperCase()})` : ''}`,
        subtitle: `${authorName ? `By ${authorName}` : ''} - ${subtitle}`,
        media,
      }
    },
  },
})