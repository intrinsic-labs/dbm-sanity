import {defineField, defineType} from 'sanity'
import {isUniquePerLanguage} from '../lib/isUniquePerLanguage'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
      default: true
    },
    {
      name: 'seo',
      title: 'SEO & Schema'
    },
    {
      name: 'advanced',
      title: 'Advanced Settings'
    }
  ],
  fields: [
    // ===== BASIC CONTENT FIELDS =====
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.required().min(10).max(60).warning('Titles should be 10-60 characters for optimal SEO')
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        isUnique: isUniquePerLanguage
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description: 'Brief description of the post (120-158 characters for meta description)',
      validation: Rule => Rule.required().min(120).max(158)
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      group: 'content',
      validation: Rule => Rule.required()
    }),
    
    // ===== ENHANCED MEDIA FIELDS =====
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: {hotspot: true},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImageAlt',
      title: 'Cover Image Alt Text',
      type: 'string',
      group: 'content',
      description: 'Alternative text for the cover image (important for accessibility)',
      validation: Rule => Rule.required()
    }),
    
    // ===== AUTHOR & PUBLICATION INFO =====
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'content',
      to: [{type: 'author'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      group: 'content',
      description: 'When the post was published',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lastModified',
      title: 'Last Modified',
      type: 'datetime',
      group: 'content',
      description: 'Track content freshness for SEO - auto-updates on save',
      readOnly: true
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      group: 'content',
      description: 'Estimated reading time - auto-calculated or manual override'
    }),
    
    // ===== ENHANCED SEO & SCHEMA FIELDS =====
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      group: 'seo',
      description: 'Custom title for search engines (50-60 characters). If empty, uses main title.',
      validation: Rule => Rule.max(60)
    }),
    defineField({
      name: 'meta',
      title: 'Meta Description',
      type: 'text',
      group: 'seo',
      rows: 3,
      description: 'Custom meta description for SEO (120-158 characters). If empty, uses excerpt.',
      validation: Rule => Rule.min(120).max(158)
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      group: 'seo',
      description: 'Primary keyword this article targets'
    }),
    defineField({
      name: 'secondaryKeywords',
      title: 'Secondary Keywords',
      type: 'array',
      group: 'seo',
      of: [{type: 'string'}],
      description: 'Additional keywords this article targets',
      options: {layout: 'tags'}
    }),
    
    // ===== ARTICLE SCHEMA FIELDS =====
    defineField({
      name: 'articleType',
      title: 'Article Type',
      description: 'Types from Schema.org',
      type: 'string',
      group: 'seo',
      options: {
        list: [
          {title: 'Article (General)', value: 'Article'},
          {title: 'News Article', value: 'NewsArticle'},
          {title: 'Blog Posting', value: 'BlogPosting'},
          {title: 'Technical Article', value: 'TechnicalArticle'},
          {title: 'Medical Article', value: 'MedicalScholarlyArticle'}
        ]
      },
      initialValue: 'BlogPosting'
    }),
    defineField({
      name: 'articleSection',
      title: 'Primary Article Section',
      type: 'reference',
      group: 'seo',
      to: [{type: 'category'}],
      description: 'Primary category for schema markup - usually the first category but can override',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'wordCount',
      title: 'Word Count',
      type: 'number',
      group: 'seo',
      description: 'Approximate word count - can be auto-calculated',
      readOnly: true
    }),
    
    // ===== E-E-A-T SIGNALS =====
    defineField({
      name: 'medicallyReviewed',
      title: 'Medically Reviewed',
      type: 'boolean',
      group: 'seo',
      description: 'Has this content been reviewed by a veterinary professional?',
      initialValue: false
    }),
    defineField({
      name: 'medicalReviewer',
      title: 'Medical Reviewer',
      type: 'reference',
      group: 'seo',
      to: [{type: 'author'}],
      description: 'Veterinarian who reviewed this content',
      hidden: ({document}) => !document?.medicallyReviewed
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review Date',
      type: 'date',
      group: 'seo',
      description: 'When this content was last reviewed',
      hidden: ({document}) => !document?.medicallyReviewed
    }),
    defineField({
      name: 'nextReviewDate',
      title: 'Next Review Due',
      type: 'date',
      group: 'seo',
      description: 'When this content should be reviewed again',
      hidden: ({document}) => !document?.medicallyReviewed
    }),
    
    // ===== CONTENT CLASSIFICATION =====
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'content',
      of: [{
        type: 'reference',
        to: [{type: 'category'}]
      }],
      validation: Rule => Rule.required().min(1).max(3).error('Please select 1-3 categories')
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      validation: Rule => Rule.max(10)
    }),
    // defineField({
    //   name: 'targetAudience',
    //   title: 'Target Audience',
    //   type: 'array',
    //   group: 'seo',
    //   of: [{type: 'string'}],
    //   options: {
    //     list: [
    //       {title: 'New Dog Owners', value: 'new-owners'},
    //       {title: 'Experienced Dog Owners', value: 'experienced-owners'},
    //       {title: 'Puppy Parents', value: 'puppy-parents'},
    //       {title: 'Senior Dog Owners', value: 'senior-dog-owners'},
    //       {title: 'Professional Trainers', value: 'trainers'},
    //       {title: 'Veterinarians', value: 'vets'},
    //       {title: 'Breed Specific', value: 'breed-specific'},
    //       {title: 'General Pet Lovers', value: 'general'}
    //     ]
    //   }
    // }),
    
    // ===== FAQ SCHEMA SUPPORT =====
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions',
      type: 'array',
      group: 'seo',
      of: [{
        type: 'object',
        name: 'faq',
        title: 'FAQ Item',
        fields: [
          {
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: Rule => Rule.required()
          },
          {
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 4,
            validation: Rule => Rule.required()
          }
        ],
        preview: {
          select: {
            title: 'question',
            subtitle: 'answer'
          }
        }
      }],
      description: 'Add FAQs to potentially appear in PAA boxes and rich results'
    }),
    
    // ===== HOW-TO SCHEMA SUPPORT =====
    defineField({
      name: 'howTo',
      title: 'How-To Instructions',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'totalTime',
          title: 'Total Time',
          type: 'string',
          description: 'Total time needed (e.g., "30 minutes", "1 hour")'
        },
        {
          name: 'supply',
          title: 'Supplies Needed',
          type: 'array',
          of: [{type: 'string'}],
          description: 'List of supplies/tools needed'
        },
        {
          name: 'tool',
          title: 'Tools Required',
          type: 'array',
          of: [{type: 'string'}],
          description: 'List of tools required'
        },
        {
          name: 'steps',
          title: 'Instructions',
          type: 'array',
          of: [{
            type: 'object',
            name: 'step',
            fields: [
              {
                name: 'name',
                title: 'Step Title',
                type: 'string',
                validation: Rule => Rule.required()
              },
              {
                name: 'text',
                title: 'Step Instructions',
                type: 'text',
                rows: 3,
                validation: Rule => Rule.required()
              },
              {
                name: 'image',
                title: 'Step Image',
                type: 'image',
                options: {hotspot: true}
              },
              {
                name: 'url',
                title: 'Step URL',
                type: 'url',
                description: 'Link to detailed instructions for this step'
              }
            ],
            preview: {
              select: {
                title: 'name',
                subtitle: 'text',
                media: 'image'
              }
            }
          }]
        }
      ],
      description: 'Add step-by-step instructions for How-To schema markup'
    }),
    
    // ===== ADVANCED FEATURES =====
    defineField({
      name: 'featured',
      title: 'Sitewide Featured Post',
      type: 'boolean',
      group: 'advanced',
      initialValue: false,
      description: 'Feature this post across the site'
    }),
    defineField({
      name: 'featuredCategory',
      title: 'Featured in Category',
      type: 'boolean',
      group: 'advanced',
      initialValue: false,
      description: 'Feature this post at the top of its first category'
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'advanced',
      description: 'Prevent search engines from indexing this page',
      initialValue: false
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      group: 'advanced',
      description: 'Custom canonical URL if this content exists elsewhere'
    }),
    
    // ===== INTERNATIONAL =====
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      readOnly: true,
      hidden: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
      media: 'coverImage',
      authorName: 'author.name',
      categories: 'categories',
      language: 'language'
    },
    prepare({title, subtitle, media, authorName, categories, language}) {
      const categoryTitles = categories?.map((cat: any) => cat.title).filter(Boolean) || []
      const categoryString = categoryTitles.length > 0 ? `[${categoryTitles.join(', ')}] ` : ''
      
      return {
        title: `${title} ${language ? `(${language.toUpperCase()})` : ''}`,
        subtitle: `${categoryString}${authorName ? `By ${authorName}` : ''} - ${subtitle}`,
        media,
      }
    },
  },
})