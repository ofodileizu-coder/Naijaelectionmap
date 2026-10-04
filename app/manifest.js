// Lets phones save the site to the home screen with the electionmap.ng icon.
export default function manifest() {
  return {
    name: "electionmap.ng – Nigeria 2027 Election Map",
    short_name: "electionmap",
    description: "Build and share your Nigeria 2027 presidential election prediction.",
    start_url: "/",
    display: "standalone",
    background_color: "#e6ebe2",
    theme_color: "#10261c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
