export async function isUniquePerLanguage(slug: string, context: any) {
  const {document, getClient} = context
  const client = getClient({apiVersion: '2023-05-03'})
  const id = document._id.replace(/^drafts\./, '')
  const language = document.language
  
  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug,
    language,
  }
  
  const query = `!defined(*[
    !(_id in [$draft, $published]) && 
    slug.current == $slug && 
    language == $language
  ][0]._id)`
  
  const result = await client.fetch(query, params)
  return result
} 