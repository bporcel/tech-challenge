import React, { useState, useEffect, useRef } from 'react';
import {
    getCities,
    getEvents,
    groupEventsByDate,
    getNormalizedEvents,
} from '../../services/masterdata.service';
import literals from '../../resources/i18n/en.json';
import Events from '../../models/events.model';
import EventsResponse from '../../models/http/events-response.model';
import Cities from '../../models/cities.model';
import AllEventsTemplate from '../templates/all-events.template';

const AllEvents: React.FC = () => {
    const [filteredEvents, setFilteredEvents] = useState<Events[]>([]);
    const [cities, setCities] = useState<Cities[]>([]);
    const events = useRef<EventsResponse[]>([]);
    const normalizedEvents = useRef<Events[]>([]);

    useEffect(() => {
        getCities().then(setCities);
    }, []);

    useEffect(() => {
        if (cities.length > 0) {
            getEvents().then(eventsRes => {
                events.current = eventsRes;
            });
            getNormalizedEvents().then(eventsRes => {
                normalizedEvents.current = mapEventsAndCities(eventsRes);
                setFilteredEvents(mapEventsAndCities(eventsRes));
            });
        }
    }, [cities]);

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

    const findKeyInEvent = (filterValues, event): boolean => {
        let found = true;

        Object.keys(filterValues).forEach(key => {
            if (key !== 'from' && key !== 'to') {
                if (
                    filterValues[key] !== '' &&
                    event[key] !== filterValues[key]
                ) {
                    found = false;
                }
            }
        });

        return found;
    };

    const checkTime = (filterValues, event) => {
        let found = true;

        if (event.from < filterValues.from || event.from > filterValues.to) {
            found = false;
        }

        return found;
    };

    const handleFilterEvents = (filterValues): void => {
        let filteredEvents = [];
        if (filterValues.isFree === false) {
            filterValues.isFree = '';
        }

        normalizedEvents.current.forEach(eventGroup => {
            eventGroup.events.forEach(event => {
                if (filterValues.from === '' || filterValues.to === '') {
                    if (findKeyInEvent(filterValues, event)) {
                        const auxEvent = {
                            startDate: eventGroup.startDate,
                            ...event,
                        };
                        auxEvent && filteredEvents.push(auxEvent);
                    }
                } else {
                    if (
                        findKeyInEvent(filterValues, event) &&
                        checkTime(filterValues, event)
                    ) {
                        console.log('object');
                        const auxEvent = {
                            startDate: eventGroup.startDate,
                            ...event,
                        };
                        auxEvent && filteredEvents.push(auxEvent);
                    }
                }
            });
        });

        setFilteredEvents(groupEventsByDate(filteredEvents));
    };

    const handleClickJoin = ({ id }): void => {
        const found = events.current.find(event => `${event.id}` === id);

        sessionStorage.setItem(id, JSON.stringify(found));
    };

    const templateLiterals = {
        free: literals.free,
        signUp: literals.signUp,
        cancel: literals.cancel,
        join: literals.join,
        joinTheEvent: literals.joinTheEvent,
        modalSignUp: literals.modalSignUp,
        x: literals.x,
        noFilterEvents: literals.noFilterEvents,
        reset: literals.reset,
        eventName: literals.eventName,
        city: literals.city,
        from: literals.from,
        to: literals.to,
        youreIn: literals.youreIn,
    };

    const props = {
        events: filteredEvents,
        allEvents: normalizedEvents.current,
        cities,
        literals: templateLiterals,
        handleClickJoin,
        handleFilterEvents,
    };

    return <AllEventsTemplate {...props} />;
};

export default AllEvents;
