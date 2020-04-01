export interface Event {
    date?: string;
    id: number;
    isFree: boolean;
    name: string;
    city: string | number;
    endDate: string;
    from: string;
    duration: string;
}

export default interface Events {
    startDate: string;
    events: Event[];
}
