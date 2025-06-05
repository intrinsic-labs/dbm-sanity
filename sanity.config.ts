import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'dog-body-mind-web',

  projectId: '07tlkeid',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(
                S.documentList()
                  .title('Blog Posts (English)')
                  .filter('_type == "post" && language == "en"')
              ),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author')),
            S.divider(),
            S.listItem()
              .title('All Posts (All Languages)')
              .child(S.documentTypeList('post')),
          ])
    }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'de', title: 'German'},
        {id: 'fr', title: 'French'},
        {id: 'es', title: 'Spanish'},
        {id: 'it', title: 'Italian'}
      ],
      schemaTypes: ['post'],
      languageField: 'language'
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
