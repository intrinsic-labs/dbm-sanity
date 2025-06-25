import {defineField, defineType} from 'sanity'

export const organizationType = defineType({
  name: 'organization',
  title: 'Organization',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'legalName',
      title: 'Legal Name',
      type: 'string',
      description: 'Official legal name if different from display name'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'internationalizedArrayString',
          title: 'Alt Text',
          validation: Rule => Rule.required()
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true 
      },
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email'
        },
        {
          name: 'telephone',
          title: 'Phone',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Address',
          type: 'object',
          options: {
            columns: 2,
          },
          fields: [
            {name: 'streetAddress', title: 'Street Address', type: 'string'},
            {name: 'addressLocality', title: 'City', type: 'string'},
            {name: 'addressRegion', title: 'State/Region', type: 'string'},
            {name: 'postalCode', title: 'Postal Code', type: 'string'},
            {name: 'addressCountry', title: 'Country', type: 'string'}
          ]
        }
      ]
    }),
    defineField({
      name: 'socialProfiles',
      title: 'Social Media Profiles',
      type: 'array',
      of: [{type: 'url'}],
      description: 'Social media and other official profiles'
    }),
    defineField({
      name: 'foundingDate',
      title: 'Founding Date',
      type: 'date'
    }),
    defineField({
      name: 'organizationType',
      title: 'Organization Type',
      type: 'string',
      options: {
        list: [
          {title: 'Educational Organization', value: 'EducationalOrganization'},
          {title: 'Corporation', value: 'Corporation'},
          {title: 'Non-Profit', value: 'NGO'},
          {title: 'Local Business', value: 'LocalBusiness'},
          {title: 'Professional Service', value: 'ProfessionalService'}
        ]
      },
      initialValue: 'EducationalOrganization'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'logo'
    }
  }
}) 