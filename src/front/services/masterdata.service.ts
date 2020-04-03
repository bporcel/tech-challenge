import { get } from './http.service';
import moment from 'moment-timezone';
import routes from '../routes/routes';
import EventsResponse from '../models/http/events-response.model';
import CitiesResponse from '../models/http/cities-response.model';
import Events, { Event } from '../models/events.model';
import Cities from '../models/cities.model';

const { localhostEndPoint } = routes;

export const groupEventsByDate = (auxEvents): Events[] => {
    const events: Events[] = [];

    auxEvents.forEach(auxEvent => {
        const auxStartDate = auxEvent.startDate;

        const found = events.find(event => auxStartDate === event.startDate);

        if (found) {
            found.events.push({
                id: auxEvent.id,
                isFree: auxEvent.isFree,
                name: auxEvent.name,
                city: auxEvent.city,
                endDate: auxEvent.endDate,
                from: auxEvent.from,
                duration: auxEvent.duration,
            });
        } else {
            events.push({
                startDate: auxStartDate,
                events: [
                    {
                        id: auxEvent.id,
                        isFree: auxEvent.isFree,
                        name: auxEvent.name,
                        city: auxEvent.city,
                        endDate: auxEvent.endDate,
                        from: auxEvent.from,
                        duration: auxEvent.duration,
                    },
                ],
            });
        }
    });

    return events;
};

export const normalizeEvents = (data: EventsResponse[]): Events[] => {
    const auxEvents: EventsResponse[] = [];

    data.sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
    data.forEach(event => {
        const from = moment(event.startDate);
        const to = moment(event.endDate);
        const duration = moment.duration(to.diff(from));

        const normalizedEvent: Event = {
            ...event,
            from: from.format('HH:mm'),
            duration: `${duration.hours()}${
                0 !== duration.minutes() ? `:${duration.minutes()}h` : 'h'
            }`,
        };

        auxEvents.push({
            ...normalizedEvent,
            startDate: moment(event.startDate).format('dddd Do MMMM'),
        });
    });

    return groupEventsByDate(auxEvents);
};

export const getCities = (): Promise<Cities[]> =>
    new Promise<Cities[]>((resolve, reject) => {
        get<CitiesResponse[]>(`${localhostEndPoint}/cities`)
            .then(resolve)
            .catch(reject);
    });

export const getEvents = (): Promise<EventsResponse[]> =>
    new Promise<EventsResponse[]>((resolve, reject) => {
        get<EventsResponse[]>(`${localhostEndPoint}/events`)
            .then(resolve)
            .catch(reject);
    });

export const getNormalizedEvents = (): Promise<Events[]> =>
    new Promise<Events[]>((resolve, reject) => {
        get<EventsResponse[]>(`${localhostEndPoint}/events`)
            .then(data => {
                resolve(normalizeEvents(data));
            })
            .catch(reject);
    });
