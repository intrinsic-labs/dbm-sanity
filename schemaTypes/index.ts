import {authorType} from './authorType'
import blockContent from './blockContent'
import {postType} from './postType'

// You will likely need schemas for 'post', 'author', 'category', etc. for the blog later.
// Import them here when created.
// import post from './post'

export const schemaTypes = [
  // Document types
  authorType,
  postType,
  // Object types (used within documents)
  blockContent,
]
