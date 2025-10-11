import {defineField, defineType} from 'sanity'

export const homePageSettingsType = defineType({
  name: 'homePageSettings',
  title: 'Home Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'internationalizedArrayString',
      description: 'Main title displayed at the top of the homepage',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'internationalizedArrayString',
      description: 'Subtitle or description displayed below the title',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'YouTube video to display on the homepage (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
      validation: Rule => Rule.required().uri({
        scheme: ['http', 'https']
      })
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page Settings'
      }
    }
  }
})
