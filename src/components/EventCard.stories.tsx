import type { Meta, StoryObj } from '@storybook/react';
import EventCard from './EventCard';

const meta = {
  title: 'Components/EventCard',
  component: EventCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    delay: { control: 'number' },
  },
} satisfies Meta<typeof EventCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Dance Competition',
    description: 'Show your best moves in this exciting dance event',
    buttonText: 'Register Now',
    link: 'https://example.com/register',
    disabled: false,
  },
};

export const WithImage: Story = {
  args: {
    title: 'Music Concert',
    description: 'Join us for an evening of melodious music',
    imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    buttonText: 'Register Now',
    link: 'https://example.com/register',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    title: 'Art Exhibition',
    description: 'This event registration is now closed',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800',
    buttonText: 'Registration Closed',
    disabled: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    title: 'Drama Performance',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
    buttonText: 'Register Now',
    link: 'https://example.com/register',
    disabled: false,
  },
};

export const WithoutImage: Story = {
  args: {
    title: 'Poetry Recital',
    description: 'Express yourself through the power of words',
    buttonText: 'Register Now',
    link: 'https://example.com/register',
    disabled: false,
  },
};

export const DisabledWithoutImage: Story = {
  args: {
    title: 'Debate Competition',
    description: 'This event has concluded',
    buttonText: 'Registration Closed',
    disabled: true,
  },
};
