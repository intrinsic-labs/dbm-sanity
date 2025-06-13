import {defineField, defineType} from 'sanity'

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
      options: {source: 'title'},
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description'
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle
      }
    }
  }
}) 