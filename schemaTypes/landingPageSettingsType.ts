import {defineField, defineType} from 'sanity'

export const landingPageSettingsType = defineType({
  name: 'landingPageSettings',
  title: 'Landing Page Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Main title displayed at the top of the landing page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string',
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
    defineField({
      name: 'content',
      title: 'Page Content',
      type: 'blockContent',
      description: 'Rich text content displayed after the video and before the blog CTA',
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      language: 'language',
    },
    prepare({title, subtitle, language}) {
      return {
        title: `Landing Page ${language ? `(${language.toUpperCase()})` : ''}`,
        subtitle: title || subtitle,
      }
    },
  },
})
