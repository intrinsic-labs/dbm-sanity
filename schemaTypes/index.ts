import {authorType} from './authorType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {organizationType} from './organizationType'
import {siteSettingsType} from './siteSettingsType'
import blockContent from './blockContent'
import {youtubeType} from './youtubeType'
import {infographicType} from './infographicType'
import {citationType} from './citationType'
import tableType from './tableType.tsx'

// You will likely need schemas for 'post', 'author', 'category', etc. for the blog later.
// Import them here when created.
// import post from './post'

export const schemaTypes = [
  // Document types
  authorType,
  categoryType,
  postType,
  organizationType,
  siteSettingsType,
  // Object types (used within documents)
  blockContent,
  youtubeType,
  infographicType,
  citationType,
  tableType
]
