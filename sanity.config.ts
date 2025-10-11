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
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Home Page Settings')
              .child(S.document().schemaType('homePageSettings').documentId('homePageSettings')),
            S.listItem()
              .title('Blog Page Settings')
              .child(S.document().schemaType('blogPageSettings').documentId('blogPageSettings')),
            S.listItem()
              .title('Organization')
              .child(S.document().schemaType('organization').documentId('organization')),
            S.divider(),
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
              .child(S.documentTypeList('category')),
            S.divider(),
            S.listItem()
              .title('All Posts (All Languages)')
              .child(S.documentTypeList('post')),
            S.listItem()
              .title('Infographics')
              .child(S.documentTypeList('infographic')),
            S.divider(),
            S.listItem()
              .title('Legal Pages')
              .child(
                S.documentList()
                  .title('Legal Pages (English)')
                  .filter('_type == "legalPage" && language == "en"')
              ),
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
      schemaTypes: ['post', 'legalPage'],
      languageField: 'language'
    })
  ],

  schema: {
    types: schemaTypes,
  },
})
