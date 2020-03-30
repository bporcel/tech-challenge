import React, { useState, useEffect } from 'react';
import { getCities, getEvents } from '../../services/masterdata.service';
import literals from '../../i18n/en.json';
import Events from '../../models/events.model';
import Cities from '../../models/cities.model';
import AllEventsTemplate from '../templates/all-events.template';


const AllEvents: React.FC = () => {
    const [events, setEvents] = useState<Events[]>([]);
    const [cities, setCities] = useState<Cities[]>([]);

    useEffect(() => {
        getCities().then(setCities);
    }, []);

    useEffect(() => {
        if (cities.length > 0) {
            getEvents().then(events => {
                events.forEach(eventGroup => {
                    eventGroup.events.forEach((event, index) => {
                        const found = cities.find(
                            city => city.id === event.city
                        );
                        eventGroup.events[index] = {
                            ...event,
                            city: found.name,
                        };
                    });
                });
                setEvents(events);
            });
        }
    }, [cities]);

    const handleClickJoin = (id: string): void => {
        let event;

        events.forEach(eventGroup => {
            const found = eventGroup.events.find(event => `${event.id}` === id);

            if (found) {
                event = {
                    startDate: eventGroup.startDate,
                    events: [found],
                };
            }
        });

        sessionStorage.setItem(id, JSON.stringify(event));
    };

    const templateLiterals = {
        free: literals.free,
        signUp: literals.signUp,
        cancel: literals.cancel,
        join: literals.join,
        modalSignUp: literals.modalSignUp,
        x: literals.x
    }

    const props = {
        events,
        literals: templateLiterals,
        handleClickJoin,
    };

    return <AllEventsTemplate {...props} />;
};

export default AllEvents;
