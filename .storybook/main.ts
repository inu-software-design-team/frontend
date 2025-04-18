import type { StorybookConfig } from '@storybook/nextjs';

import { resolve } from 'path';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  features: {
    experimentalRSC: true,
  },
  docs: {
    defaultName: 'Documentation',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async config => {
    config.resolve?.plugins?.push(
      new TsconfigPathsPlugin({
        configFile: resolve(__dirname, '../tsconfig.json'),
      }),
    );

    if (!config.module?.rules) return config;

    config.module.rules = [
      ...config.module.rules.map(rule => {
        if (!rule || rule === '...') return rule;
        if (rule.test && /svg/.test(String(rule.test)))
          return { ...rule, exclude: /\.svg$/i };
        return rule;
      }),
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ];

    return config;
  },
  staticDirs: [
    //'../pubilc',
    {
      from: '../src/app',
      to: 'src/app',
    },
  ],
};
export default config;
