import {defineField, defineType} from 'sanity'
import {isUniquePerLanguage} from '../lib/isUniquePerLanguage'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name for the category',
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
      description: 'URL-friendly version of the category name',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'SEO-optimized description of this category'
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'Custom meta description for category pages',
      validation: Rule => Rule.max(158)
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Creates hierarchical category structure'
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
      subtitle: 'description',
      media: 'featuredImage',
      language: 'language'
    },
    prepare({title, subtitle, media, language}) {
      return {
        title: `${title} ${language ? `(${language.toUpperCase()})` : ''}`,
        subtitle,
        media
      }
    }
  }
}) 