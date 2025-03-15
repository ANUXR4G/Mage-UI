import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../mage-ui/**/*.mdx",
    "../mage-ui/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack",
    "@storybook/addon-themes",
    "storybook-dark-mode",
  ],

  env: (config) => ({
    ...config,
    STORYBOOK: "true",
  }),

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: [],
};

export default config;