'use client';

import { useEffect } from 'react';

// Forces the dark theme for the route that mounts this, regardless of the
// site-wide theme preference stored in localStorage. Restores whatever
// theme was active before mount on unmount, so navigating away from this
// route (client-side, no full page load) doesn't leave the rest of the
// site stuck dark. The root layout's own theme script only runs once on
// the initial hard load, so this route also needs the blocking inline
// script below (rendered by this route's layout) to avoid a light-theme
// flash before this effect can run.
export function ForceDarkTheme() {
  useEffect(() => {
    const wasLight = document.documentElement.classList.contains('light');
    document.documentElement.classList.remove('light');
    return () => {
      if (wasLight) document.documentElement.classList.add('light');
    };
  }, []);

  return null;
}
