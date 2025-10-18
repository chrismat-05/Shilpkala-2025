import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import EventCarousel from '@/components/EventCarousel';

// Mock embla-carousel-react
const mockScrollNext = vi.fn();
const mockScrollPrev = vi.fn();
const mockSelectedScrollSnap = vi.fn(() => 0);
const mockOn = vi.fn();
const mockOff = vi.fn();

vi.mock('embla-carousel-react', () => {
  return {
    default: () => {
      return [
        vi.fn(),
        {
          scrollNext: mockScrollNext,
          scrollPrev: mockScrollPrev,
          selectedScrollSnap: mockSelectedScrollSnap,
          on: mockOn,
          off: mockOff,
        },
      ];
    },
  };
});

// Mock resolveImage
vi.mock('@/lib/images', () => ({
  resolveImage: (img: string) => `/images/${img}`,
}));

describe('EventCarousel', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockScrollNext.mockClear();
    mockScrollPrev.mockClear();
    mockSelectedScrollSnap.mockClear();
    mockOn.mockClear();
    mockOff.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  const mockEvents = [
    { title: 'Event 1', image: 'event1.jpg', link: 'https://event1.com', isOpen: true, desc: 'First event' },
    { title: 'Event 2', image: 'event2.jpg', link: 'https://event2.com', isOpen: true, desc: 'Second event' },
    { title: 'Event 3', image: 'event3.jpg', link: 'https://event3.com', isOpen: false, desc: 'Third event' },
  ];

  it('renders all events', () => {
    render(<EventCarousel events={mockEvents} />);
    
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Event 3')).toBeInTheDocument();
  });

  it('renders navigation arrows', () => {
    render(<EventCarousel events={mockEvents} />);
    
    const prevButton = screen.getByLabelText('Previous');
    const nextButton = screen.getByLabelText('Next');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('calls scrollPrev when Previous button is clicked', async () => {
    render(<EventCarousel events={mockEvents} />);
    
    const prevButton = screen.getByLabelText('Previous');
    prevButton.click();
    
    expect(mockScrollPrev).toHaveBeenCalled();
  });

  it('calls scrollNext when Next button is clicked', async () => {
    render(<EventCarousel events={mockEvents} />);
    
    const nextButton = screen.getByLabelText('Next');
    nextButton.click();
    
    expect(mockScrollNext).toHaveBeenCalled();
  });

  it('renders disabled state for closed events', () => {
    render(<EventCarousel events={mockEvents} />);
    
    // Event 3 is closed, so should show "Registration closed"
    const closedButtons = screen.getAllByText('Registration closed');
    expect(closedButtons.length).toBeGreaterThan(0);
  });

  it('renders register button for open events', () => {
    render(<EventCarousel events={mockEvents} />);
    
    const registerButtons = screen.getAllByText('Register Now');
    expect(registerButtons.length).toBeGreaterThan(0);
  });

  it('returns null when events array is empty', () => {
    const { container } = render(<EventCarousel events={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when events is undefined', () => {
    const { container } = render(<EventCarousel events={undefined as any} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<EventCarousel events={mockEvents} className="custom-class" />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('custom-class');
  });
});
