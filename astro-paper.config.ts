import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://Xalp.github.io",
    title: "Xalp & Peyto's",
    description: "See Through",
    author: "Jin Ziqi",
    profile: "https://Xalp.github.io",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "Asia/Singapore",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/Xalp" },
    { name: "mail",     url: "mailto:xalphinions@gmail.com" },
  ],
  shareLinks: [
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});