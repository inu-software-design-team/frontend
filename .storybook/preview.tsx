import type { Preview } from '@storybook/react';

import React from 'react';

import { Pretendard } from '../src/app/fonts';

import '../src/app/globals.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={Pretendard.style}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
