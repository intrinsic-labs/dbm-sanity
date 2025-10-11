import {defineField, defineType} from 'sanity'

export const blogPageSettingsType = defineType({
  name: 'blogPageSettings',
  title: 'Blog Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'internationalizedArrayString',
      description: 'Main title displayed at the top of the blog listing page',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'internationalizedArrayString',
      description: 'Subtitle or description displayed below the title',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Blog Page Settings'
      }
    }
  }
})
