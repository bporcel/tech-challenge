import React, { useEffect } from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import useFormState from '../../hooks/form-hooks.hook';
import Events, { Event } from '../../models/events.model';
import Cities from '../../models/cities.model';
import Literals from '../../models/literals.model';
import TimeRange from '../molecules/time-range.molecule';
import Predictive from '../atoms/predictive.atom';
import Button from '../atoms/button.atom';
import CheckBox from '../atoms/check-box.atom';

const StyledFilter = styled.div`
    padding: 2em 0 1em 0;
    background-color: ${Theme.colors.lighterGray};
`;

interface Props {
    allEvents: Events[];
    cities: Cities[];
    literals: Literals;
    handleFilterEvents: Function;
}

const Filter: React.FC<Props> = ({
    allEvents,
    cities,
    literals,
    handleFilterEvents,
}) => {
    const filterValues = {
        name: '',
        city: '',
        from: '',
        to: '',
        isFree: false,
    };

    const [filterState, setFilterState] = useFormState(filterValues);

    useEffect(() => {
        handleFilterEvents(filterState);
    }, [filterState]);

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

    const timeRangeLiterals = {
        from: literals.from,
        to: literals.to,
        morning: 'Morning',
        afternoon: 'Afternoon',
        night: 'Night',
    };

    return (
        <StyledFilter className="d-flex flex-column align-items-center">
            <div className="d-flex flex-column align-items-end">
                <div className="d-flex flex-row mb-1">
                    <div className="d-flex flex-row">
                        <Predictive
                            id="events"
                            inputId="name"
                            value={filterState['name']}
                            label={literals.eventName}
                            options={normalizeEvents()}
                            handleChange={setFilterState}
                        />
                        <div className="pl-1">
                            <Predictive
                                id="cities"
                                inputId="city"
                                value={filterState['city']}
                                label={literals.city}
                                options={cities}
                                handleChange={setFilterState}
                            />
                        </div>
                        <div className="d-flex flex-row pl-1">
                            <TimeRange
                                values={{
                                    from: filterState['from'],
                                    to: filterState['to'],
                                }}
                                literals={timeRangeLiterals}
                                handleChange={setFilterState}
                            />
                        </div>
                        <div className="pl-1">
                            <CheckBox
                                id="isFree"
                                checked={filterState['isFree']}
                                label={literals.free}
                                handleChange={setFilterState}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        id="reset"
                        type="warning"
                        initialText={literals.reset}
                        handleClick={setFilterState}
                    />
                </div>
            </div>
        </StyledFilter>
    );
};

export default Filter;
