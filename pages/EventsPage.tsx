import React from 'react';
import Section from '../components/Section';
import EventCard from '../components/EventCard';
import { EVENTS } from '../constants';

const EventsPage: React.FC = () => {
    return (
        <Section id="events" title="Upcoming Events">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENTS.map((event, index) => (
              <EventCard key={event.id} event={event} delay={index * 100} />
            ))}
          </div>
        </Section>
    );
};

export default EventsPage;
