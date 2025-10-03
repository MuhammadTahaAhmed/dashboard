"use client";

import React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

function createEmotionCache() {
  let insertionPoint;
  if (typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="emotion-insertion-point"]');
    insertionPoint = meta ?? undefined;
  }
  return createCache({ key: "mui", insertionPoint });
}

export default function EmotionProvider({ children }) {
  const [cache] = React.useState(() => createEmotionCache());
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}


