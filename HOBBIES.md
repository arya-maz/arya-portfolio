# Editing Hobbies

Edit `src/data/hobbies.ts`. The page and gallery components do not need editing
when you add a post. Posts display in array order. Use a unique `id` per post.

## Text post

Each string in `paragraphs` becomes a separate paragraph, with space between
paragraphs. This array is an editing convenience; it does not render bullets.

```ts
{
  id: 'weekend-walk',
  type: 'text',
  title: 'A weekend walk',
  paragraphs: [
    'The first paragraph of my post.',
    'Another thought, displayed as its own paragraph.',
  ],
},
```

## Media post

Put files in `public/media/hobbies/`. Their URLs start with `/media/hobbies/`.
Use the same paragraph format as text posts. `mediaSide` chooses the desktop
side; mobile always shows media first. Add any number of media entries in order.
Keep at least one media entry per media post.

```ts
{
  id: 'guitar-practice',
  type: 'media',
  title: 'Practicing a new song',
  mediaSide: 'left', // 'left' or 'right'
  paragraphs: ['A little context.', 'A second paragraph if needed.'],
  media: [
    {
      type: 'image',
      src: '/media/hobbies/guitar.jpg',
      alt: 'My guitar beside a small practice amplifier',
      // Optional smaller preview; defaults to src for images.
      thumbnail: '/media/hobbies/guitar-thumb.jpg',
    },
    {
      type: 'video',
      src: '/media/hobbies/practice.mp4',
      title: 'A short guitar practice recording',
      poster: '/media/hobbies/practice-cover.jpg',
      // Optional WebVTT captions for speech or meaningful audio.
      captions: '/media/hobbies/practice.en.vtt',
    },
    {
      type: 'embed',
      url: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
      title: 'My performance on YouTube',
      thumbnail: '/media/hobbies/youtube-cover.jpg',
    },
    {
      type: 'embed',
      url: 'https://www.instagram.com/reel/YOUR_POST_ID/',
      title: 'My Instagram reel',
      thumbnail: '/media/hobbies/reel-cover.jpg',
    },
  ],
},
```

Replace example filenames and IDs with real ones. Remove optional properties
when you do not have the corresponding file. Prefer MP4 with H.264/AAC or WebM
for local videos. A poster doubles as the video's thumbnail. Embeds without a
thumbnail show a small numbered link tile; local videos show a play tile.

YouTube watch, short, and share URLs are converted to privacy-enhanced embed
URLs. Instagram post/reel URLs and Vimeo video URLs are also converted. Other
providers need the HTTPS `src` URL from their iframe embed code, not the whole
HTML snippet. Some providers prohibit embedding or require public posts,
cookies, or a login.

## Controls and accessibility

- Arrow buttons and thumbnails select media; navigation wraps at the ends.
- Swipe left/right on images or focus the viewer and press Left/Right.
- Home/End select the first/last slide.
- Video and iframe controls retain their native gestures and keyboard controls;
  use the gallery buttons or thumbnails to leave those slides.
- Hidden local videos pause and hidden embeds unload to stop playback.
- There is no autoplay. Captions and useful alt text are supplied per entry.
- No-JavaScript visitors see images/local videos in a list while embedded
  content requires JavaScript.

The existing sample media remains placeholder artwork, not real recordings.
