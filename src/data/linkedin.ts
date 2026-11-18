type LinkedInUrl = `https://www.linkedin.com/${string}`;
type LinkedInEmbedUrl = `https://www.linkedin.com/embed/feed/update/urn:li:${string}`;

export interface PublicLinkedInPost {
  url: LinkedInUrl;
  publishedAt: string; // YYYY-MM-DD
  text: string;
  image?: { src: `/media/linkedin/${string}`; alt: string };
  embed?: { src: LinkedInEmbedUrl; height?: number };
}

// Add your own posts here after confirming their LinkedIn audience is Anyone.
export const linkedinPosts: readonly PublicLinkedInPost[] = [
  {
    url: 'https://www.linkedin.com/posts/aryamaz_ai-softwareengineering-nyc-activity-7528321418602909697-Ray4',
    publishedAt: '2026-11-17',
    text: 'A recap of Sandboxing in NYC, hosted by Merge and Modal. The event brought together engineers to discuss how companies can run AI agents safely, with a focus on isolating workloads, protecting credentials, and controlling access. The original post includes photos from the event.',
    embed: {
      src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7528321415314558977',
      height: 460,
    },
  },
  {
    url: 'https://www.linkedin.com/posts/aryamaz_softwaredevelopment-fullstackdevelopment-ugcPost-7526474139839348736-whEH/',
    publishedAt: '2026-11-12',
    text: 'An introduction to Liner Notes, a full-stack app that recommends albums using Spotify listening data. The walkthrough shows Spotify sign-in, album discovery, and account deletion. The post also covers how the app balances familiar artists with discovery and caches profile data to manage rate limits.',
    embed: {
      src: 'https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7526474139839348736',
      height: 460,
    },
  },
];
