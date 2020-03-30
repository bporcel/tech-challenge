import { get } from './http.service';
import moment from 'moment';
import routes from '../routes/routes';
import EventsResponse from '../models/http/events-response.model';
import CitiesResponse from '../models/http/cities-response.model';
import Events from '../models/events.model';

const { localhostEndPoint } = routes;

const normalizeEvents = (data: EventsResponse[]): Events[] => {
    const events: Events[] = [];
    const auxEvents: EventsResponse[] = [];

    data.sort((a, b) => +new Date(a.startDate) - +new Date(b.startDate));
    data.forEach(event => {
        auxEvents.push({
            ...event,
            startDate: moment(event.startDate).format('dddd Do MMMM-hh:mm'),
        });
    });

    auxEvents.forEach(auxEvent => {
        const auxStartDate = auxEvent.startDate.split('-')[0];
        const auxTime = auxEvent.startDate.split('-')[1];

        const found = events.find(
            event => auxStartDate === event.startDate.split('-')[0]
        );

        if (found) {
            found.events.push({
                id: auxEvent.id,
                isFree: auxEvent.isFree,
                name: auxEvent.name,
                city: auxEvent.city,
                endDate: auxEvent.endDate,
                time: auxEvent.startDate.split('-')[1],
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
                        time: auxTime,
                    },
                ],
            });
        }
    });

    return events;
};

export const getCities = (): Promise<CitiesResponse[]> =>
    new Promise<CitiesResponse[]>((resolve, reject) => {
        get<CitiesResponse[]>(`${localhostEndPoint}/cities`)
            .then(data => {
                resolve(data);
            })
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
