// Bump these whenever shutter-reveal.mp4 or shutter-audio.mp3's contents
// change. The files are served from the same URL, so browsers/CDNs that
// already cached the old bytes would otherwise keep playing the stale
// video/audio indefinitely.
const SHUTTER_VIDEO_VERSION = '2';
const SHUTTER_AUDIO_VERSION = '2';

export const SHUTTER_VIDEO_SRC = `/shutter-reveal.mp4?v=${SHUTTER_VIDEO_VERSION}`;
export const SHUTTER_AUDIO_SRC = `/shutter-audio.mp3?v=${SHUTTER_AUDIO_VERSION}`;
