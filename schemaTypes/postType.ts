import {defineField, defineType} from 'sanity'
import {isUniquePerLanguage} from '../lib/isUniquePerLanguage'

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
      options: {
        source: 'title',
        isUnique: isUniquePerLanguage
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Brief description of the post (Aim for 120-158 characters)',
      validation: Rule => Rule.required().min(120).max(158)
      // add a character count to the field
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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'category'}]
      }],
      validation: Rule => Rule.required().min(1).max(5).error('Please select at least 1 category and no more than 5')
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
      title: 'Sitewide Featured Post',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this post across the site'
    }),
    defineField({
      name: 'featuredCategory',
      title: 'Featured in Category',
      type: 'boolean',
      initialValue: false,
      description: 'Feature this post by listing it at the top of all posts in its first category'
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
      categories: 'categories',
      language: 'language'
    },
    prepare({title, subtitle, media, authorName, categories, language}) {
      const categoryTitles = categories?.map((cat: any) => cat.title).filter(Boolean) || []
      const categoryString = categoryTitles.length > 0 ? `[${categoryTitles.join(', ')}] ` : ''
      
      return {
        title: `${title} ${language ? `(${language.toUpperCase()})` : ''}`,
        subtitle: `${categoryString}${authorName ? `By ${authorName}` : ''} - ${subtitle}`,
        media,
      }
    },
  },
})