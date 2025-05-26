import type {PreviewProps} from 'sanity'
import {Flex, Text, Button, Card, Stack} from '@sanity/ui'
import {EditIcon} from '@sanity/icons'
import ReactPlayer from 'react-player/youtube'
import {useState} from 'react'

export function YouTubePreview(props: PreviewProps) {
  // The props come from the prepare function in youtubeType.ts
  const {title, subtitle: url, renderDefault} = props
  const [showEdit, setShowEdit] = useState(false)
  
  console.log('YouTubePreview props:', props) // Debug logging

  // Safely convert props to strings
  const titleString = title ? String(title) : undefined
  const urlString = url ? String(url) : undefined

  if (showEdit && renderDefault) {
    return (
      <Card padding={3}>
        <Stack space={3}>
          <Flex justify="space-between" align="center">
            <Text weight="medium">Edit YouTube Video</Text>
            <Button
              icon={EditIcon}
              mode="ghost"
              text="Done"
              onClick={() => setShowEdit(false)}
            />
          </Flex>
          {renderDefault(props)}
        </Stack>
      </Card>
    )
  }

  return (
    <Card padding={3}>
      <Stack space={3}>
        <Flex justify="space-between" align="center">
          <Text weight="medium" size={1}>
            {titleString || 'YouTube Video'}
          </Text>
          <Button
            icon={EditIcon}
            mode="ghost"
            text="Edit"
            onClick={() => setShowEdit(true)}
          />
        </Flex>
        
        {typeof urlString === 'string' && urlString && (urlString.includes('youtube.com') || urlString.includes('youtu.be')) ? (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            paddingBottom: '56.25%', // 16:9 aspect ratio
            height: 0,
            overflow: 'hidden'
          }}>
            <ReactPlayer 
              url={urlString} 
              width="100%" 
              height="100%"
              style={{ position: 'absolute', top: 0, left: 0 }}
              config={{
                playerVars: { 
                  showinfo: 1,
                  modestbranding: 1
                }
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
      </Stack>
    </Card>
  )
} 