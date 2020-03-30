import React, { useEffect, useState } from 'react';
import literals from '../../i18n/en.json';
import Events, {Event} from '../../models/events.model';
import MyEventsTemplate from '../templates/my-events.template';

const MyEvents: React.FC = () => {
    const [events, setEvents] = useState<Events[]>([]);

    const getMyEvents = (): void => {
        const eventsAux: Events[] = [];
        for (let i in sessionStorage) {
            const item = sessionStorage.getItem(i);

            if (item) {
                const parsedItem = JSON.parse(item);
                const found = eventsAux.find(
                    eventGroup => eventGroup.startDate === parsedItem.startDate
                );

                if (found) {
                    found.events.push(parsedItem.events[0]);
                } else {
                    eventsAux.push(parsedItem);
                }
            }
        }

        setEvents(eventsAux);
    };

    useEffect(() => {
        getMyEvents();
    }, []);

    const templateLiterals = {
        myNextEvents: literals.myNextEvents,
        youreIn: literals.youreIn,
        cancel: literals.cancel,
        free: literals.free,
    };

    const handleClickCancelEvent = (myEvent: Event): void => {
        for (let i = 0; i < events.length; i++) {
            const found = events[i].events.find(
                event => event.id === myEvent.id
            );

            if (found) {
                sessionStorage.removeItem(`${found.id}`);
                getMyEvents();
                break;
            }
        }
    };

    const props = {
        literals: templateLiterals,
        handleClickCancelEvent,
        events,
    };

    return <MyEventsTemplate {...props} />;
};

export default MyEvents;
