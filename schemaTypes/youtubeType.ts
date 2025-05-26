import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'
import {YouTubePreview} from './YouTubePreview'

export const youtubeType = defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Video',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
      description: 'Enter a YouTube URL (youtube.com or youtu.be)',
      validation: Rule => Rule.required().custom(url => {
        if (url && !url.includes('youtube.com') && !url.includes('youtu.be')) {
          return 'Must be a valid YouTube URL'
        }
        return true
      })
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Video Title',
      description: 'Optional: Override the video title'
    })
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare(selection) {
      const {title, url} = selection
      console.log('YouTubeType prepare:', selection) // Debug logging
      return {
        title: title || 'YouTube Video',
        subtitle: url || 'No URL provided',
        media: PlayIcon
      }
    }
  },
  components: {
    preview: YouTubePreview,
  },
}) 