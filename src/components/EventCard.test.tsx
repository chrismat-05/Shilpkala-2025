import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EventCard from '@/components/EventCard';

describe('EventCard', () => {
  it('renders with title and description', () => {
    render(
      <EventCard 
        title="Test Event" 
        description="Test Description"
        buttonText="Register"
        link="https://example.com"
      />
    );
    
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders disabled state correctly', () => {
    render(
      <EventCard 
        title="Disabled Event" 
        buttonText="Register"
        disabled={true}
      />
    );
    
    // Check for "Registration closed" badge
    expect(screen.getByText('Registration closed')).toBeInTheDocument();
    
    // Check that button is not a link when disabled
    const button = screen.getByText('Register');
    expect(button.tagName).toBe('DIV');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('renders enabled state with link correctly', () => {
    render(
      <EventCard 
        title="Active Event" 
        buttonText="Register Now"
        link="https://register.example.com"
        disabled={false}
      />
    );
    
    // Check that button is an anchor tag when enabled
    const link = screen.getByText('Register Now');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://register.example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows registration closed badge only when disabled', () => {
    const { rerender } = render(
      <EventCard 
        title="Event" 
        buttonText="Register"
        disabled={false}
      />
    );
    
    expect(screen.queryByText('Registration closed')).not.toBeInTheDocument();
    
    rerender(
      <EventCard 
        title="Event" 
        buttonText="Register"
        disabled={true}
      />
    );
    
    expect(screen.getByText('Registration closed')).toBeInTheDocument();
  });

  it('applies correct styling when disabled', () => {
    const { container } = render(
      <EventCard 
        title="Disabled Event" 
        buttonText="Register"
        disabled={true}
      />
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('opacity-60');
    expect(card).toHaveClass('grayscale');
  });

  it('renders with image when imageUrl is provided', () => {
    render(
      <EventCard 
        title="Event with Image" 
        imageUrl="https://example.com/image.jpg"
        buttonText="Register"
      />
    );
    
    const image = screen.getByAltText('Event with Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('does not render image when imageUrl is not provided', () => {
    render(
      <EventCard 
        title="Event without Image" 
        buttonText="Register"
      />
    );
    
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
