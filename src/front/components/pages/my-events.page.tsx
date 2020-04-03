import React, { useEffect, useState } from 'react';
import { normalizeEvents, getCities } from '../../services/masterdata.service';
import EventsResponse from '../../models/http/events-response.model';
import Cities from '../../models/cities.model';
import literals from '../../resources/i18n/en.json';
import Events, { Event } from '../../models/events.model';
import MyEventsTemplate from '../templates/my-events.template';

const MyEvents: React.FC = () => {
    const [events, setEvents] = useState<Events[]>([]);
    const [cities, setCities] = useState<Cities[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const mapEventsAndCities = eventsRes => {
        eventsRes.forEach(eventGroup => {
            eventGroup.events.forEach((event, index) => {
                const found = cities.find(city => city.id === event.city);
                found &&
                    (eventGroup.events[index] = {
                        ...event,
                        city: found.name,
                    });
            });
        });

        return eventsRes;
    };

    const getMyEvents = (): void => {
        const eventsAux: EventsResponse[] = [];
        for (const i in sessionStorage) {
            const item = sessionStorage.getItem(i);

            if (item) {
                const parsedItem = JSON.parse(item);
                eventsAux.push(parsedItem);
            }
        }

        setEvents(mapEventsAndCities(normalizeEvents(eventsAux)));
    };

    useEffect(() => {
        getCities().then(setCities);
    }, []);

    useEffect(() => {
        if (0 < cities.length) {
            getMyEvents();
        }
    }, [cities]);

    const templateLiterals = {
        myNextEvents: literals.myNextEvents,
        youreIn: literals.youreIn,
        cancel: literals.cancel,
        free: literals.free,
        myEventsEmpty: literals.myEventsEmpty,
    };

    const handleClickCancelEvent = (myEvent: Event): void => {
        for (let i = 0; i < events.length; i++) {
            const found = events[i].events.find(
                event => event.id === myEvent.id
            );

            if (found) {
                sessionStorage.removeItem(`${found.id}`);
                getMyEvents();

                console.log('events', events)
                if (1 === events.length % 5 && 2 < events.length) {
                    setCurrentPage(currentPage - 1);
                }
                break;
            }
        }
    };

    const props = {
        literals: templateLiterals,
        handleClickCancelEvent,
        currentPage,
        events,
        setCurrentPage,
    };

    return <MyEventsTemplate {...props} />;
};

export default MyEvents;
