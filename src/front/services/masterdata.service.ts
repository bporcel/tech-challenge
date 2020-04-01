import { get } from './http.service';
import moment from 'moment-timezone';
import routes from '../routes/routes';
import EventsResponse from '../models/http/events-response.model';
import CitiesResponse from '../models/http/cities-response.model';
import Events,{Event} from '../models/events.model';
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
                time: auxEvent.time,
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
                        time: auxEvent.time,
                    },
                ],
            });
        }
    });

    return events;
};

const normalizeEvents = (data: EventsResponse[]): Events[] => {
    const auxEvents: EventsResponse[] = [];

    data.sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
    data.forEach(event => {
        const normalizedEvent: Event = {
            ...event,
            time: moment(event.startDate).format('HH:mm'),
        };

        auxEvents.push({
            ...normalizedEvent,
            startDate: moment(event.startDate).format('dddd Do MMMM'),
        });
    });

    return groupEventsByDate(auxEvents);
};

// const normalizeCities = (data: CitiesResponse[]): Cities[] => {
//     const normalizedCities: Cities[] = [];

//     data.forEach((d: CitiesResponse) => {
//         const found = normalizedCities.find(city => city.name === d.name);
//         if (!found) {
//             normalizedCities.push(d);
//         }
//     });

//     return normalizedCities;
// };

export const getCities = (): Promise<Cities[]> =>
    new Promise<Cities[]>((resolve, reject) => {
        get<CitiesResponse[]>(`${localhostEndPoint}/cities`)
            .then(resolve)
            .catch(reject);
    });

export const getEvents = (): Promise<Events[]> =>
    new Promise<Events[]>((resolve, reject) => {
        get<EventsResponse[]>(`${localhostEndPoint}/events`)
            .then(data => {
                resolve(normalizeEvents(data));
            })
            .catch(reject);
    });
