# arya-portfolio
My personal portfolio website

## Homepage feed

Add your own public posts to `src/data/linkedin.ts`. First check that the post audience is **Anyone** and that the link opens while signed out. Supply the original post URL, its date in `YYYY-MM-DD` format, and either your original text or a summary. The homepage lists posts newest first and displays local text for entries without an embed.

For an image you can republish, store the file under `public/media/linkedin/` and provide its `/media/linkedin/…` path and alt text. To include the official LinkedIn embed, use **Embed this post** on LinkedIn and copy the iframe's `src` and optional `height` into the entry's `embed` field. Posts with an embed display the iframe by itself. If an embed becomes unavailable, remove the entry’s `embed` field to show its saved text and optional image.

Remove the local entry if you delete the original post or restrict its audience. The homepage uses the entries in this file and updates on the next build.

Add YouTube uploads to `src/data/youtube.ts` after confirming they are **Public** and listed on your channel's **Videos** tab. Use the video's ID, title, and publication date. Remove an entry if its visibility changes. The homepage combines both sources and renders only the 10 newest entries. Videos stream from YouTube and are not stored in the repository.
