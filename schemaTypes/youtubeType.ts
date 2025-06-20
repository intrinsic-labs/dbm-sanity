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
      title: 'Video Title Override',
      description: 'Optional: Override the YouTube title for SEO purposes. Leave blank to use original title.',
      validation: Rule => Rule.max(100)
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Video Description',
      description: 'Brief description of why this video is relevant to your content',
      rows: 3,
      validation: Rule => Rule.max(300)
    }),
    defineField({
      name: 'transcript',
      type: 'text',
      title: 'Video Transcript',
      description: 'Full transcript for accessibility and SEO. Clean up auto-generated captions for best results.',
      rows: 10
    }),
    defineField({
      name: 'keyMoments',
      type: 'array',
      title: 'Key Moments / Chapters',
      description: 'Highlight important timestamps for your audience',
      of: [{
        type: 'object',
        name: 'keyMoment',
        fields: [
          {
            name: 'time',
            title: 'Time (seconds)',
            type: 'number',
            description: 'Time in seconds (e.g., 90 for 1:30)',
            validation: Rule => Rule.required().min(0)
          },
          {
            name: 'title',
            title: 'Chapter Title',
            type: 'string',
            validation: Rule => Rule.required().max(50)
          },
          {
            name: 'description',
            title: 'Chapter Description',
            type: 'string',
            validation: Rule => Rule.max(100)
          }
        ],
        preview: {
          select: {
            title: 'title',
            subtitle: 'time'
          },
          prepare({title, subtitle}) {
            const minutes = Math.floor(subtitle / 60);
            const seconds = subtitle % 60;
            return {
              title,
              subtitle: `${minutes}:${seconds.toString().padStart(2, '0')}`
            }
          }
        }
      }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url'
    },
    prepare(selection) {
      const {title, url} = selection
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