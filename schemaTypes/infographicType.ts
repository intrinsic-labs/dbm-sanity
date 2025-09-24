import {defineField, defineType} from 'sanity'
import {supportedLanguages} from './supportedLanguages'

export const infographicType = defineType({
  name: 'infographic',
  title: 'Infographic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'localizedTitle',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: supportedLanguages.map((lang) => ({
                  title: lang.title,
                  value: lang.id,
                })),
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().min(5).max(100),
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'language',
            },
            prepare({title, subtitle}) {
              const lang = supportedLanguages.find((l) => l.id === subtitle)
              return {
                title: title || 'Untitled',
                subtitle: lang?.title || subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((array) => {
            if (!array) return 'At least one title is required'

            const languages = array.map((item: any) => item.language)
            const uniqueLanguages = new Set(languages)

            if (languages.length !== uniqueLanguages.size) {
              return 'Each language can only be used once'
            }

            // Require at least English (default language)
            if (!languages.includes('en')) {
              return 'English title is required'
            }

            return true
          }),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'array',
      description: 'URL-friendly identifier for each language',
      of: [
        {
          type: 'object',
          name: 'localizedSlug',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: supportedLanguages.map((lang) => ({
                  title: lang.title,
                  value: lang.id,
                })),
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'current',
              title: 'Slug',
              type: 'slug',
              options: {
                source: (doc: any, context: any) => {
                  // Find the title for this language
                  const currentLang = context.parent?.language
                  if (currentLang && doc.title) {
                    const titleForLang = doc.title.find((t: any) => t.language === currentLang)
                    return titleForLang?.value || ''
                  }
                  return ''
                },
                maxLength: 96,
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'current.current',
              subtitle: 'language',
            },
            prepare({title, subtitle}) {
              const lang = supportedLanguages.find((l) => l.id === subtitle)
              return {
                title: title || 'No slug',
                subtitle: lang?.title || subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((array) => {
            if (!array) return 'At least one slug is required'

            const languages = array.map((item: any) => item.language)
            const uniqueLanguages = new Set(languages)

            if (languages.length !== uniqueLanguages.size) {
              return 'Each language can only be used once'
            }

            // Require at least English (default language)
            if (!languages.includes('en')) {
              return 'English slug is required'
            }

            return true
          }),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'localizedDescription',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: supportedLanguages.map((lang) => ({
                  title: lang.title,
                  value: lang.id,
                })),
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.max(500),
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'language',
            },
            prepare({title, subtitle}) {
              const lang = supportedLanguages.find((l) => l.id === subtitle)
              return {
                title: title || 'No description',
                subtitle: lang?.title || subtitle,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'image',
      title: 'Infographic Images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'localizedImage',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: supportedLanguages.map((lang) => ({
                  title: lang.title,
                  value: lang.id,
                })),
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'asset',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              media: 'asset',
              subtitle: 'language',
            },
            prepare({media, subtitle}) {
              const lang = supportedLanguages.find((l) => l.id === subtitle)
              return {
                title: `Image (${lang?.title || subtitle})`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .custom((array) => {
            if (!array) return 'At least one image is required'

            const languages = array.map((item: any) => item.language)
            const uniqueLanguages = new Set(languages)

            if (languages.length !== uniqueLanguages.size) {
              return 'Each language can only be used once'
            }

            // Require at least English (default language)
            if (!languages.includes('en')) {
              return 'English image is required'
            }

            return true
          }),
    }),

    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'array',
      description: 'Accessibility description for screen readers',
      of: [
        {
          type: 'object',
          name: 'localizedAltText',
          fields: [
            {
              name: 'language',
              title: 'Language',
              type: 'string',
              options: {
                list: supportedLanguages.map((lang) => ({
                  title: lang.title,
                  value: lang.id,
                })),
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required().min(10).max(200),
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'language',
            },
            prepare({title, subtitle}) {
              const lang = supportedLanguages.find((l) => l.id === subtitle)
              return {
                title: title || 'No alt text',
                subtitle: lang?.title || subtitle,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({title, media}) {
      // Show English title in preview, fallback to first available
      const englishTitle = title?.find((t: any) => t.language === 'en')
      const firstTitle = title?.[0]
      const displayTitle = englishTitle?.value || firstTitle?.value || 'Untitled Infographic'

      // Show English image in preview, fallback to first available
      const englishImage = media?.find((img: any) => img.language === 'en')
      const firstImage = media?.[0]
      const displayImage = englishImage?.asset || firstImage?.asset

      return {
        title: displayTitle,
        media: displayImage,
      }
    },
  },
})
