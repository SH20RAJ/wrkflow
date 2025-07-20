import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  experimental: {
    disableIncrementalCache: true,
  },
  override: {
    wrapper: "cloudflare-node",
    converter: "edge",
  },
});
