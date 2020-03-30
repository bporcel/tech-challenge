let cities = require('./resources/cities.json');
let events = require('./resources/events.json');

module.exports = () => {
    let data = { events: [], cities: [] };

    if (cities && events) {
        data = {
            ...data,
            events: events,
            cities: cities,
        };
    }

    return data;
};
