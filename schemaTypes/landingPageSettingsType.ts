import {defineField, defineType} from 'sanity'

export const landingPageSettingsType = defineType({
  name: 'landingPageSettings',
  title: 'Landing Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'internationalizedArrayString',
      description: 'Main title displayed at the top of the landing page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'internationalizedArrayString',
      description: 'Subtitle or description displayed below the title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description:
        'YouTube video to display on the landing page (e.g., https://www.youtube.com/watch?v=VIDEO_ID)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Landing Page Settings',
      }
    },
  },
})
