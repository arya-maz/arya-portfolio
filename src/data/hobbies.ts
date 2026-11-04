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
      "I've always been heavily into music, but picking up the guitar has taken it to a higher level. I recently have taken up recording covers of some of my favorite songs to play, and uploading them to YouTube in an effort to become more deeply acquainted to these songs and how they're developed and played.",
      "My level of commitment to delivering high-quality covers is astronomical, aspiring to achieve accurate recreations of the playing, tonal palette, and overall sound of the songs. My most recent cover is displayed right here.",
      "Some of my current goals are:",
      "1. Learn a full album from front to back -- a challenge that I ambitiously attempted very early on in my time playing, but am committed to now with more knowledge and technical skill under my belt.",
      "2. Challenge myself by learning songs above my skill level in order to sharpen up my abilities through consistent and effective practice.",
      "3. Get more acquainted with tone-matching and EQ. I've been learning about tone, audio engineering, and about different guitar equipment and their effects on the overall sound of playing. I find it extremely fascinating, and it's such a layered concept.",
      "Across all fields, I take great pride and put a lot of effort into my work, and my covers are no exception. I push myself to strive for a great product to be able to show others and maybe inspire other players to start creating covers of their own.",
    ],
    media: [{ type: 'embed', url: 'https://www.youtube.com/watch?v=SQBK_MVjxxQ', title: 'Deftones - Rats!Rats!Rats! [Guitar Cover]'}],
  },
  {
    id: 'walks',
    type: 'media',
    title: 'Outdoor Walking / Traveling',
    mediaSide: 'left',
    paragraphs: [
      'An aspect of my life that has really become a priority in the last few years is exercise and health. Although I work out several days a week, sticking to a consistent and effective weightlifting routine, walking outdoors when the weather is warm and brisk is a feeling like none other. However, it\'s the sense of adventure that fuels my ambition to walk and explore the world around me.',
      'Put simply, my biggest incentive for taking these walks isn\'t just the exercise; it\'s the opportunity to explore a piece of the world from a human level. Wandering through an unfamiliar park, city, neighborhood, cliffside, overlook viewpoint, or trail by foot is a euphoric experience. Admiring the architecture of buildings, the engineering and design of systems, the foliage, the people, and the means of life is simply a wonder of its own. Although, as thrilling as it is to soak everything in within the moment, capturing a stellar photo or a cinematic video of the ambiance creates a lasting memory that can be shared.',
    ],
    media: [
      { type: 'image', src: '/media/hobbies/standing-on-rock.jpeg', alt: 'Ramapo Lake -- Wanaque, NJ', thumbnail: '/media/hobbies/standing-on-rock-THUMBNAIL.jpeg' },
      { type: 'image', src: '/media/hobbies/red-bank-downtown.jpeg', alt: 'Downtown -- Red Bank, NJ', thumbnail: '/media/hobbies/red-bank-downtown-THUMBNAIL.jpeg' },
      { type: 'video', src: '/media/hobbies/big-sur-video.mp4', title: 'Pacific Coast Highway (Rt. 1) -- Big Sur, CA', thumbnail: '/media/hobbies/big-sur-video-THUMBNAIL.jpeg' },
      { type: 'image', src: '/media/hobbies/nyc-hamilton-park.jpeg', alt: 'NYC Skyline from Hamilton Park -- Weehawken, NJ', thumbnail: '/media/hobbies/nyc-hamilton-park-THUMBNAIL.jpeg' },
      { type: 'image', src: '/media/hobbies/san-diego-beach.jpeg', alt: 'Sunset Cliffs -- San Diego, CA', thumbnail: '/media/hobbies/san-diego-beach-THUMBNAIL.jpeg' },
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
