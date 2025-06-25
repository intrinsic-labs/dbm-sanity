import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic Info',
      default: true
    },
    {
      name: 'credentials',
      title: 'Credentials & E-E-A-T'
    },
    {
      name: 'social',
      title: 'Social & Contact'
    }
  ],
  fields: [
    // ===== BASIC INFO =====
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basic',
      description: "Author's full name",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {source: 'name'},
      description: 'Slug for the author to be used in URLs',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      group: 'basic',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          validation: Rule => Rule.required()
        }
      ],
      description: 'Image of the author'
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'internationalizedArrayText',
      group: 'basic',
      description: 'Author biography for display (localized)'
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job Title',
      type: 'internationalizedArrayString',
      group: 'basic',
      description: 'Current professional title (localized)'
    }),
    
    // ===== CREDENTIALS & E-E-A-T =====
    defineField({
      name: 'credentials',
      title: 'Professional Credentials',
      type: 'array',
      group: 'credentials',
      of: [{
        type: 'object',
        name: 'credential',
        fields: [
          {
            name: 'name',
            title: 'Credential Name',
            type: 'string',
            description: 'e.g., "Doctor of Veterinary Medicine", "CCPDT-KA"',
            validation: Rule => Rule.required()
          },
          {
            name: 'issuingOrganization',
            title: 'Issuing Organization',
            type: 'string',
            description: 'Organization that issued this credential',
            validation: Rule => Rule.required()
          },
          {
            name: 'url',
            title: 'Verification URL',
            type: 'url',
            description: 'Link to verify this credential'
          },
          {
            name: 'dateIssued',
            title: 'Date Issued',
            type: 'date'
          },
          {
            name: 'expires',
            title: 'Expiration Date',
            type: 'date'
          }
        ],
        preview: {
          select: {
            title: 'name',
            subtitle: 'issuingOrganization'
          }
        }
      }],
      description: 'Professional certifications and qualifications for E-E-A-T'
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      group: 'credentials',
      of: [{
        type: 'object',
        name: 'education',
        fields: [
          {
            name: 'institution',
            title: 'Institution',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'degree',
            title: 'Degree',
            type: 'string',
          },
          {
            name: 'field',
            title: 'Field of Study',
            type: 'string'
          },
          {
            name: 'graduationYear',
            title: 'Graduation Year',
            type: 'number'
          },
          {
            name: 'url',
            title: 'Institution URL',
            type: 'url'
          }
        ],
        preview: {
          select: {
            title: 'degree',
            subtitle: 'institution'
          }
        }
      }]
    }),
    defineField({
      name: 'experience',
      title: 'Professional Experience',
      type: 'array',
      group: 'credentials',
      of: [{
        type: 'object',
        name: 'experience',
        fields: [
          {
            name: 'position',
            title: 'Position',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'organization',
            title: 'Organization',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'startDate',
            title: 'Start Date',
            type: 'date'
          },
          {
            name: 'endDate',
            title: 'End Date',
            type: 'date',
            description: 'Leave empty if current position'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
          }
        ],
        preview: {
          select: {
            title: 'position',
            subtitle: 'organization'
          }
        }
      }]
    }),
    defineField({
      name: 'specialties',
      title: 'Areas of Expertise',
      type: 'internationalizedArrayString',
      group: 'credentials',
      description: 'Specific areas of expertise for knowsAbout schema (localized)'
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
      group: 'credentials',
      description: 'Total years of professional experience'
    }),
    
    // ===== SOCIAL & CONTACT =====
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'social',
      description: 'Professional email address'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      group: 'social',
      description: 'Professional social media profiles',
      fields: [
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn Profile'
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter/X Profile'
        },
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram Profile'
        },
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook Profile'
        },
        {
          name: 'youtube',
          type: 'url',
          title: 'YouTube Channel'
        },
        {
          name: 'website',
          type: 'url',
          title: 'Personal Website'
        }
      ]
    }),
    
    // ===== SCHEMA-SPECIFIC FIELDS =====
    defineField({
      name: 'sameAs',
      title: 'Same As URLs',
      type: 'array',
      group: 'social',
      of: [{type: 'url'}],
      description: 'URLs that represent the same person (social profiles, professional directories, etc.)'
    }),
    defineField({
      name: 'worksFor',
      title: 'Works For',
      type: 'string',
      group: 'credentials',
      description: 'Organization this person works for'
    }),
    defineField({
      name: 'memberOf',
      title: 'Member Of',
      type: 'array',
      group: 'credentials',
      of: [{type: 'string'}],
      description: 'Professional organizations this person belongs to'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'jobTitle',
      media: 'avatar'
    }
  }
}) 