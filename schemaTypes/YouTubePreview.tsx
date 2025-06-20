import type {PreviewProps} from 'sanity'
import {Text, Card, Stack} from '@sanity/ui'

export function YouTubePreview(props: PreviewProps) {
  // The props come from the prepare function in youtubeType.ts
  const {title, subtitle: url} = props
  
  // Safely convert props to strings
  const titleString = title ? String(title) : undefined
  const urlString = url ? String(url) : undefined

  const getYouTubeId = (url: string): string | null => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
    const match = url?.match(regex)
    return match ? match[1] : null
  }

  const videoId = urlString ? getYouTubeId(urlString) : null

  return (
    <Card padding={3}>
      <Stack space={3}>
        <Text weight="medium" size={1}>
          {titleString ? `${titleString} (Override)` : 'YouTube Video'}
        </Text>
        
        {videoId ? (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden',
            borderRadius: '4px'
          }}>
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Video thumbnail"
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        ) : (
          <Card padding={4} tone="caution">
            <Text align="center">Add a YouTube URL to see preview</Text>
          </Card>
        )}
        
        {urlString && (
          <Text size={1} muted>
            {urlString}
          </Text>
        )}

        <div style={{ 
          fontSize: '12px', 
          color: '#666',
          padding: '8px',
          backgroundColor: '#f0f8ff',
          borderRadius: '4px'
        }}>
          Video title, duration, and metadata are automatically fetched in the frontend for SEO schema markup
        </div>
      </Stack>
    </Card>
  )
} 