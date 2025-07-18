import {defineField, defineType} from 'sanity'
import {isUniquePerLanguage} from '../lib/isUniquePerLanguage'

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'internationalizedArrayString',
      description: 'Display name for the category (localized)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'internationalizedArraySlug',
      options: {
        source: 'title',
        isUnique: isUniquePerLanguage
      },
      description: 'URL-friendly version of the category name (localized)',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'internationalizedArrayText',
      description: 'SEO-optimized description of this category (localized)'
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'internationalizedArrayText',
      description: 'Custom meta description for category pages (localized)',
      validation: Rule => Rule.max(158)
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'internationalizedArrayString',
          title: 'Alt Text',
          validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Creates hierarchical category structure'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'featuredImage'
    },
    prepare({title, subtitle, media}) {
      // Extract English title from internationalized array
      const englishTitle = title?.find((item: any) => item._key === 'en')?.value || 'Untitled'
      const englishSubtitle = subtitle?.find((item: any) => item._key === 'en')?.value
      
      return {
        title: englishTitle,
        subtitle: englishSubtitle,
        media
      }
    }
  }
}) 