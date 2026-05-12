import { useMemo } from 'react';

/**
 * Determines the best video format supported by the browser.
 * Returns a single URL to avoid loading both WebM and MP4 simultaneously.
 *
 * The browser's `<video>` element with multiple `<source>` tags can trigger
 * parallel downloads of both formats. By selecting one format upfront and
 * using a single `src` attribute, we save ~4-5 MB of unnecessary bandwidth.
 *
 * Priority: WebM (smaller, better compression) > MP4 (universal fallback)
 */
export function useVideoSource(
  webm: string | undefined,
  mp4: string | undefined
): string | undefined {
  return useMemo(() => {
    if (!webm && !mp4) return undefined;
    if (!webm) return mp4;
    if (!mp4) return webm;

    // Check if browser supports WebM
    if (typeof document !== 'undefined') {
      const video = document.createElement('video');
      const canPlayWebm = video.canPlayType('video/webm; codecs="vp9"')
        || video.canPlayType('video/webm; codecs="vp8"')
        || video.canPlayType('video/webm');
      if (canPlayWebm) {
        return webm;
      }
    }

    // Fallback to MP4
    return mp4;
  }, [webm, mp4]);
}
