import {defineField, defineType} from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: "Author's name in plain text",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      description: 'Slug for the author to be used in URLs',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
      description: 'Image of the author'
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      description: 'About the author'
    }),
    defineField({
      name: 'credentials',
      title: 'Professional Credentials',
      type: 'string',
      description: 'Professional certifications and qualifications',
      placeholder: 'Certified Dog Behaviorist, CCPDT-KA, 15+ years experience'
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      description: 'Professional social media profiles',
      fields: [
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn Profile'
        },
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram Profile'
        },
        {
          name: 'website',
          type: 'url',
          title: 'Personal Website'
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
    },
  },
}) 