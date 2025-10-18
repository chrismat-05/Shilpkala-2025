import type { Meta, StoryObj } from '@storybook/react';
import EventCarousel from './EventCarousel';

const meta = {
  title: 'Components/EventCarousel',
  component: EventCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    autoplayMs: { control: 'number' },
  },
} satisfies Meta<typeof EventCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleEvents = [
  {
    title: 'Classical Dance',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    link: 'https://example.com/dance',
    isOpen: true,
    desc: 'Showcase traditional dance forms',
  },
  {
    title: 'Musical Concert',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800',
    link: 'https://example.com/music',
    isOpen: true,
    desc: 'An evening of melodious performances',
  },
  {
    title: 'Art Exhibition',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    link: 'https://example.com/art',
    isOpen: false,
    desc: 'Display of creative artworks',
  },
];

export const Default: Story = {
  args: {
    events: sampleEvents,
    autoplayMs: 3500,
  },
};

export const SingleEvent: Story = {
  args: {
    events: [sampleEvents[0]],
    autoplayMs: 3500,
  },
};

export const TwoEvents: Story = {
  args: {
    events: sampleEvents.slice(0, 2),
    autoplayMs: 3500,
  },
};

export const AllClosed: Story = {
  args: {
    events: sampleEvents.map(e => ({ ...e, isOpen: false })),
    autoplayMs: 3500,
  },
};

export const AllOpen: Story = {
  args: {
    events: sampleEvents.map(e => ({ ...e, isOpen: true })),
    autoplayMs: 3500,
  },
};

export const SlowAutoplay: Story = {
  args: {
    events: sampleEvents,
    autoplayMs: 8000,
  },
};

export const FastAutoplay: Story = {
  args: {
    events: sampleEvents,
    autoplayMs: 2000,
  },
};
