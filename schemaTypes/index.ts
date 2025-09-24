import {authorType} from './authorType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {organizationType} from './organizationType'
import blockContent from './blockContent'
import {youtubeType} from './youtubeType'
import {infographicType} from './infographicType'

// You will likely need schemas for 'post', 'author', 'category', etc. for the blog later.
// Import them here when created.
// import post from './post'

export const schemaTypes = [
  // Document types
  authorType,
  categoryType,
  postType,
  organizationType,
  // Object types (used within documents)
  blockContent,
  youtubeType,
  infographicType
]
