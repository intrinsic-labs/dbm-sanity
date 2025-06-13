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
      description: 'Brief description of what this category covers'
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
      language: 'language'
    },
    prepare({title, subtitle, language}) {
      return {
        title: `${title} ${language ? `(${language.toUpperCase()})` : ''}`,
        subtitle
      }
    }
  }
}) 