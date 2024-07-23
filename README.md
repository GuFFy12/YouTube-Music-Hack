# YouTube Music Hack

## Transforming YouTube Music into a Native-Like Premium App

### Overview

This guide details how to hack YouTube Music to function as a native premium application on iOS devices using userscripts. For Android users, YouTube Vanced is recommended. Although there were attempts to enhance the native experience by adding a progressive web app (PWA) to the headers, userscripts do not function in PWAs. Therefore, the solution involves running YouTube Music in a browser.

### Initial Attempt

The first method attempted involved overriding the `visibilitychange` event. However, this approach proved ineffective after a page reload.

### Second Attempt

The second method focused on modifying the serialized experiment flags within the YouTube Music configuration. This script listens for the `load` event and updates the `serializedExperimentFlags` with new values to enable premium features.

### YouTube Premium Features

Key features of YouTube Premium include:

1. **High Audio Quality**
2. **Download Audio**
3. **Audio Mode Switcher**
   - `OMV_PREFERRED`
   - `ATV_PREFERRED`
4. **Cast to a TV Device**
5. **Background Play**
   - `visibilitychange`
   - `mweb_allow_background_playback`

### Flag Comparison: Premium vs. Base

The comparison of configuration flags (`ytcfg`) between the premium and base versions reveals the following:

- `"ab_fk_sk_cl": true` - Not found in JS sources
- `"ab_sa_ef": true` - Settings related to ads
- `"enable_is_extended_monitoring": true` - Not found in JS sources
- `"enable_web_home_top_landscape_image_layout_click_location": true` - Not found in JS sources
- `"music_web_enable_server_queues": true` - Likely allows saving the play queue on the server side for continuous listening across devices
- `"music_web_is_canary": true` - Not found in JS sources
- `"music_web_is_canary_control": true` - Not found in JS sources
- `"music_web_canary_stage": 0 -> 2` - Not found in JS sources

### Notes

- Premium features cannot play audio in the background on the web, only in the app.
- Detailed settings might be uncovered by reversing the YouTube Music APK.
- A full content dump from both premium and base versions is needed for a thorough comparison.