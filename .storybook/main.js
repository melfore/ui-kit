module.exports = {
  stories: ["../src/**/*.stories.(tsx|mdx)"],
  addons: [
    "@storybook/preset-typescript",
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-knobs/register",
    "@storybook/addon-links",
  ],
};
