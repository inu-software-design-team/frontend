import type { Preview } from '@storybook/react';

import React from 'react';

import { Pretendard } from '../src/app/fonts';

import '../src/app/globals.css';
import { ELEMENT_SIZES, ELEMENT_SPACINGS, ELEMENT_STATUS } from '../src/types';

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
  argTypes: {
    size: {
      control: 'radio',
      options: ELEMENT_SIZES,
    },
    status: {
      control: 'select',
      options: ELEMENT_STATUS,
    },
    spacing: {
      control: 'radio',
      options: ELEMENT_SPACINGS,
    },
  },
  decorators: [
    Story => (
      <div style={Pretendard.style}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
