import {defineArrayMember, defineType} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * portable text content.
 * You can add additional types to this array if you want to define
 * custom components inside the content.
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what text styles are available for content editors
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
      // Marks let you mark up inline text in the block editor
      marks: {
        // Decorators usually describe a single property – e.g. emphasis or code
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({allowRelative: true})
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you need to
    // correspond the id to the component filename.
    // Example: allow editors to add images directly into rich text fields:
    // defineArrayMember({
    //   type: 'image',
    //   options: {hotspot: true},
    //   fields: [
    //     defineField({
    //       name: 'alt',
    //       type: 'string',
    //       title: 'Alternative Text',
    //       validation: Rule => Rule.required()
    //     })
    //   ]
    // }),
  ],
}) 