import React, { useRef } from 'react';
import Events, { Event } from '../../models/events.model';
import Cities from '../../models/cities.model';
import Literals from '../../models/literals.model';
import TimeRange from '../molecules/time-range.molecule';
import Predictive from '../atoms/predictive.atom';
import Button from '../atoms/button.atom';
import CheckBox from '../atoms/check-box.atom';

interface Props {
    allEvents: Events[];
    cities: Cities[];
    literals: Literals;
    handleClickFilterEvents: Function;
}

const Filter: React.FC<Props> = ({
    allEvents,
    cities,
    literals,
    handleClickFilterEvents,
}) => {
    const normalizeEvents = (): Event[] => {
        const normalizedEvents = [];
        allEvents.forEach(({ events }) => {
            events.forEach((event: Event) => {
                normalizedEvents.push({
                    id: event.id,
                    name: event.name,
                });
            });
        });

        return normalizedEvents;
    };

    const filterValues = useRef({
        name: '',
        city: '',
        from: '',
        to: '',
        isFree: false,
    });

    const setFilterValues = (id, value): void => {
        filterValues.current = {
            ...filterValues.current,
            [id]: value,
        };
    };

    const filterEvents = (): void => {
        handleClickFilterEvents(filterValues.current);
    };

    const timeRangeLiterals = {
        from: literals.from,
        to: literals.to,
    };

    return (
        <div className="d-flex flex-row align-items-center justify-between">
            <div className="d-flex flex-row">
                <Predictive
                    id="events"
                    inputId="name"
                    label={literals.eventName}
                    options={normalizeEvents()}
                    setForm={setFilterValues}
                />
                <div className="pl-1">
                    <Predictive
                        inputId="city"
                        id="cities"
                        label={literals.city}
                        options={cities}
                        setForm={setFilterValues}
                    />
                </div>
                <div className="d-flex flex-row pl-1">
                    <TimeRange
                        literals={timeRangeLiterals}
                        {...{ setFilterValues }}
                    />
                </div>
                <div className="pl-1">
                    <CheckBox
                        id="isFree"
                        label={literals.free}
                        setForm={setFilterValues}
                    />
                </div>
            </div>

            <div className="pl-1">
                <Button
                    type="secondary"
                    initialText={literals.filter}
                    handleClick={filterEvents}
                />
            </div>
        </div>
    );
};

export default Filter;
