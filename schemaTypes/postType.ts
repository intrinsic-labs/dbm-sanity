import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Cover Image Alt Text',
      type: 'string',
      description: 'Alternative text for the cover image (important for accessibility)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publication Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM D, YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'Optional: Will be calculated automatically if left empty',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {

        // LENA: add more blog post categories here
        list: [
          {title: 'Puppy', value: 'puppy'},
          {title: 'Senior Dog', value: 'senior-dog'},
          {title: 'Physical Conditioning', value: 'physical-conditioning'},
          {title: 'Recovery/Rehabilitation', value: 'recovery-rehabilitation'},
          {title: 'Mental Stimulation', value: 'mental-stimulation'},
          {title: 'Supplements', value: 'supplements'},
        ],

        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'coverImage',
      authorName: 'author.name',
    },
    prepare({title, subtitle, media, authorName}) {
      return {
        title,
        subtitle: `${authorName ? `By ${authorName}` : ''} - ${subtitle}`,
        media,
      }
    },
  },
})