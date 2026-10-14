export type HobbyMedia =
  | { type: 'image', src: string, alt: string, thumbnail?: string }
  | { type: 'video', src: string, title: string, poster?: string, thumbnail?: string, captions?: string }
  | { type: 'embed', url: string, title: string, thumbnail?: string };

type BasePost = { id: string, title: string, paragraphs: string[] };
export type HobbyPost =
  | (BasePost & { type: 'text' })
  | (BasePost & { type: 'media'; mediaSide?: 'left' | 'right'; media: HobbyMedia[] });

// Add, remove, or reorder posts here. Each paragraphs entry renders as a
// separate paragraph, not a bullet. Give every post a unique id.
// Local files go in public/media/hobbies and use /media/hobbies/file.jpg.
// See HOBBIES.md for image, local video, YouTube, and Instagram examples.

export const hobbyPosts: HobbyPost[] = [
  {
    id: 'intro-post',
    type: 'text',
    title: 'Welcome!',
    paragraphs: [
      'Having recently launched this page, I wanted to introduce this section to any curious visitors that may be passing by.',
      'Here, you\'ll find a collection of interesting hobbies and passions that I spend my personal time embarking on',
    ],
  },
  {
    id: 'youtube-guitar-cover',
    type: 'media',
    title: 'Guitar Covers',
    mediaSide: 'right',
    paragraphs: [
      'I\'m currently working on recording and creating full guitar covers of the entire Deftones album Koi No Yokan',
      'My commitment is to deliver high-quality renditions of the playing, tone recreation, and overall sound in an attempt to fulfill several goals:',
      '1. Learn a full album that I enjoy -- both rhythm and lead guitar parts -- to the extent where I can accurately play them live',
      '2. Challenge myself by struggling to play songs a notch my skill level in order to sharpen up my abilities through consistent and effective practice.',
      '3. Struggle through the process of tone-matching the guitar tracks. I am using different equipment than what was used in the album\'s recording, and learning to replicate the tones as closely as possible has taught me a TON about how EQ shaping and effects pedals work.',
      'I take great pride in my work, and pushing myself to upload and publicize my progress gives me the pressure I need to ensure nothing but the highest quality gets released to the world, as it is a reflection of myself and my work.',
    ],
    media: [{ type: 'embed', url: 'https://www.youtube.com/watch?v=fLBqSkWb1WE', title: 'Deftones - Swerve City [Guitar Cover]'}],
  },
  {
    id: 'walks',
    type: 'media',
    title: 'Scenic Outdoor Walks',
    mediaSide: 'left',
    paragraphs: [
      'Exercise has been an aspect of my life that has only really become a priority in the last few years. Although I work out several days a week, mostly consisting of weightlifting, walking outdoors when the weather is warm is a feeling like none other.',
    ],
    media: [
      { type: 'image', src: '/media/hobbies/standing-on-rock.jpeg', alt: 'Ramapo Lake -- Wanaque, NJ' },
      { type: 'image', src: '/media/hobbies/red-bank-downtown.jpeg', alt: 'Downtown -- Red Bank, NJ' },
      { type: 'video', src: '/media/hobbies/big-sur-video.mov', title: 'Pacific Coast Highway (Rt. 1) -- Big Sur, CA', thumbnail: '/media/hobbies/big-sur-video.jpeg' },
      { type: 'image', src: '/media/hobbies/nyc-hamilton-park.jpeg', alt: 'NYC Skyline from Hamilton Park -- Weehawken, NJ' },
      // Temporary thumbnail preview: remove this block after reviewing.
      // ...Array.from({ length: 20 }, (_, index) => {
      //   const number = index + 1;
      //   const [width, height] = [[640, 360], [360, 640], [480, 480]][index % 3];
      //   const color = ['#17364b', '#466b65', '#85624d', '#665780'][index % 4];
      //   const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="96" fill="white">${number}</text></svg>`;
      //   return { type: 'image' as const, src: `data:image/svg+xml,${encodeURIComponent(svg)}`, alt: `Dummy media ${number} — ${width} × ${height}` };
      // }),
      // End temporary thumbnail preview.

    ],
  },
];
