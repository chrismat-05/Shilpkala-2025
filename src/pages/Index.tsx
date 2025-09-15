
import { motion } from 'framer-motion';
import EventCard from '@/components/EventCard';
import React from 'react';

import eventsData from '@/data/events.json';

const Index = () => {
  const brochure = eventsData.find((e) => e.type === 'brochure');
  const events = eventsData.filter((e) => e.type === 'event');

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight flex-1">Shilpkala 2025</h1>
        </div>

        {brochure && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="max-w-md mx-auto">
              <EventCard
                title={brochure.title}
                imageUrl={brochure.image || ''}
                buttonText="View Brochure"
                link={brochure.link}
                disabled={!brochure.isOpen}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {events.map((event, index) => (
            <EventCard
              key={event.title}
              title={event.title}
              imageUrl={event.image || ''}
              buttonText={event.isOpen ? 'Register Now' : 'Registration closed'}
              link={event.link}
              delay={0.1 * index}
              disabled={!event.isOpen}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;