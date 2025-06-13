import {authorType} from './authorType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import blockContent from './blockContent'
import {youtubeType} from './youtubeType'

// You will likely need schemas for 'post', 'author', 'category', etc. for the blog later.
// Import them here when created.
// import post from './post'

export const schemaTypes = [
  // Document types
  authorType,
  categoryType,
  postType,
  // Object types (used within documents)
  blockContent,
  youtubeType,
]
