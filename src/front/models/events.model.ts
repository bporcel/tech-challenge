export interface Event {
    date?: string;
    id: number;
    isFree: boolean;
    name: string;
    city: string | number;
    endDate: string;
    time: string;
}

export default interface Events {
    startDate: string;
    events: Event[];
}
