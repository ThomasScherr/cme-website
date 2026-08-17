import { useMemo } from 'react';

/**
 * Wählt das beste vom Browser unterstützte Videoformat.
 *
 * Liefert genau EINE URL zurück statt mehrerer <source>-Elemente. Mit mehreren
 * Quellen laden manche Browser beide Formate parallel – das kostete hier
 * mehrere Megabyte umsonst.
 *
 * Reihenfolge: AV1 (kleinste Dateien) → H.264 als universeller Rückfall.
 *
 * WICHTIG: Die Prüfung muss den CODEC nennen, nicht nur den Container.
 * Ein reines canPlayType('video/webm') meldet auch dann Erfolg, wenn der
 * Browser zwar VP9, aber kein AV1 beherrscht – Safari auf älteren Macs zum
 * Beispiel. Das Hero-Video liegt als AV1 vor; ohne Codec-Angabe bekämen
 * diese Browser eine Datei, die sie nicht abspielen können, und sähen nur
 * das Poster-Bild.
 */

/** AV1 Main Profile, Level 3.0, 8 bit – deckt unsere Hero-Videos ab. */
const AV1_CODEC = 'video/webm; codecs="av01.0.05M.08"';

function canPlay(type: string): boolean {
  if (typeof document === 'undefined') return false;
  const video = document.createElement('video');
  // canPlayType liefert 'probably', 'maybe' oder '' – nur '' heißt "nein".
  return video.canPlayType(type) !== '';
}

export function useVideoSource(
  webm: string | undefined,
  mp4: string | undefined
): string | undefined {
  return useMemo(() => {
    if (!webm && !mp4) return undefined;
    if (!webm) return mp4;
    if (!mp4) return webm;

    if (typeof document === 'undefined') return mp4;

    // AV1 zuerst – die WebM-Fassung ist AV1-kodiert.
    if (canPlay(AV1_CODEC)) return webm;

    // Kein AV1: H.264-Fassung nehmen. Eine VP9-Prüfung wäre hier falsch,
    // denn die WebM-Datei enthält kein VP9.
    return mp4;
  }, [webm, mp4]);
}
