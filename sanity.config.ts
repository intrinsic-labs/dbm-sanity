import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaTypes} from './schemaTypes'
import {supportedLanguages} from './schemaTypes/supportedLanguages'

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
              .title('Organization')
              .child(S.document().schemaType('organization').documentId('organization')),
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
            S.listItem()
              .title('Categories')
              .child(
                S.documentList()
                  .title('Categories (English)')
                  .filter('_type == "category" && language == "en"')
              ),
            S.divider(),
            S.listItem()
              .title('All Posts (All Languages)')
              .child(S.documentTypeList('post')),
            S.listItem()
              .title('All Categories (All Languages)')
              .child(S.documentTypeList('category')),
          ])
    }),
    visionTool(),
    internationalizedArray({
      languages: supportedLanguages,
      defaultLanguages: [supportedLanguages.find(l => l.isDefault)?.id || 'en'],
      fieldTypes: ['string', 'text', 'slug']
    }),
    documentInternationalization({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'uk', title: 'English (UK)'},
        {id: 'de', title: 'German'},
        {id: 'fr', title: 'French'},
        {id: 'es', title: 'Spanish'},
        {id: 'it', title: 'Italian'}
      ],
      schemaTypes: ['post', 'category'],
      languageField: 'language'
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
