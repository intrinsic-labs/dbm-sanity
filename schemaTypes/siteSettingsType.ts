import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {
      name: 'newsletter',
      title: 'Newsletter',
      default: true
    },
    {
      name: 'social',
      title: 'Social Media'
    },
    {
      name: 'general',
      title: 'General Settings'
    }
  ],
  fields: [
    // ===== NEWSLETTER SETTINGS =====
    defineField({
      name: 'newsletter',
      title: 'Newsletter Signup',
      type: 'object',
      group: 'newsletter',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'internationalizedArrayString',
          description: 'Main heading (e.g., "DO NOT MISS OUR LAUNCH")',
          validation: Rule => Rule.required()
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'internationalizedArrayString',
          description: 'Subheading text (e.g., "SIGN UP FOR UPDATES")',
          validation: Rule => Rule.required()
        },
        {
          name: 'placeholder',
          title: 'Email Input Placeholder',
          type: 'internationalizedArrayString',
          description: 'Placeholder text for email input',
          validation: Rule => Rule.required()
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'internationalizedArrayString',
          description: 'Submit button text (e.g., "Subscribe")',
          validation: Rule => Rule.required()
        },
        {
          name: 'successMessage',
          title: 'Success Message',
          type: 'internationalizedArrayString',
          description: 'Message shown after successful signup'
        },
        {
          name: 'errorMessage',
          title: 'Error Message',
          type: 'internationalizedArrayString',
          description: 'Message shown when signup fails'
        }
      ]
    }),

    // ===== SOCIAL MEDIA SETTINGS =====
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'social',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          title: 'Social Link',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Facebook', value: 'facebook'},
                  {title: 'Instagram', value: 'instagram'},
                  {title: 'X (Twitter)', value: 'x'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'YouTube', value: 'youtube'},
                  {title: 'TikTok', value: 'tiktok'},
                  {title: 'Pinterest', value: 'pinterest'},
                  {title: 'Threads', value: 'threads'},
                  {title: 'Custom', value: 'custom'}
                ]
              },
              validation: Rule => Rule.required()
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              description: 'Full URL to your social media profile',
              validation: Rule => Rule.required().uri({
                scheme: ['http', 'https']
              })
            },
            {
              name: 'label',
              title: 'Custom Label',
              type: 'string',
              description: 'Only needed if platform is "Custom"',
              hidden: ({parent}) => parent?.platform !== 'custom'
            }
          ],
          preview: {
            select: {
              platform: 'platform',
              url: 'url',
              label: 'label'
            },
            prepare({platform, url, label}) {
              const displayName = platform === 'custom' ? label || 'Custom Link' : platform;
              return {
                title: displayName,
                subtitle: url
              }
            }
          }
        }
      ],
      description: 'Add your social media profiles'
    }),

    // ===== GENERAL SETTINGS (for future use) =====
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      group: 'general',
      description: 'Name of the website'
    }),
    defineField({
      name: 'maintenanceMode',
      title: 'Maintenance Mode',
      type: 'boolean',
      group: 'general',
      description: 'Enable to show maintenance message',
      initialValue: false
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
})
