import React, { useState, useEffect, useRef, useCallback } from 'react';
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
    const [currentPage, setCurrentPage] = useState<number>();
    const events = useRef<EventsResponse[]>([]);
    const normalizedEvents = useRef<Events[]>([]);

    const mapEventsAndCities = useCallback(
        (eventsRes): Events[] => {
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
        },
        [cities]
    );

    useEffect(() => {
        getCities().then(setCities);
    }, []);

    useEffect(() => {
        if (0 < cities.length) {
            getEvents().then(eventsRes => {
                events.current = eventsRes;
            });
            getNormalizedEvents().then(eventsRes => {
                normalizedEvents.current = mapEventsAndCities(eventsRes);
                setFilteredEvents(mapEventsAndCities(eventsRes));
            });
        }
    }, [cities]);

    const findKeyInEvent = (filterValues, event): boolean => {
        let found = true;

        Object.keys(filterValues).forEach(key => {
            const filterKey = filterValues[key];
            const eventKey = event[key];

            if ('from' !== key && 'to' !== key) {
                if (
                    'isFree' !== key &&
                    '' !== filterKey &&
                    !eventKey.toUpperCase().includes(filterKey.toUpperCase())
                ) {
                    found = false;
                } else if (
                    'isFree' === key &&
                    '' !== filterKey &&
                    filterKey !== eventKey
                ) {
                    found = false;
                }
            }
        });

        return found;
    };

    const checkTime = (filterValues, event): boolean => {
        let found = true;

        if (event.from < filterValues.from || event.from > filterValues.to) {
            found = false;
        }

        return found;
    };

    const handleFilterEvents = (filterValues): void => {
        const filteredEvents = [];
        if (false === filterValues.isFree) {
            filterValues.isFree = '';
        }

        normalizedEvents.current.forEach(eventGroup => {
            eventGroup.events.forEach(event => {
                if ('' === filterValues.from || '' === filterValues.to) {
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
                        const auxEvent = {
                            startDate: eventGroup.startDate,
                            ...event,
                        };
                        auxEvent && filteredEvents.push(auxEvent);
                    }
                }
            });
        });

        setCurrentPage(1);
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
        currentPage,
        literals: templateLiterals,
        setCurrentPage,
        handleClickJoin,
        handleFilterEvents,
    };

    return <AllEventsTemplate {...props} />;
};

export default AllEvents;
