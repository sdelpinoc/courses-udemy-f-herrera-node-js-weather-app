import fs from 'fs';

import Mapbox from "./mapbox.js";
import OpenWeather from "./openweather.js";

export default class Searches {
    history = [];
    dbFile = './db/database.json';

    get capitalizeHistory() {
        return this.history.map(place => {
            const words = place.split(' ');
            const wordsUpper = words.map(word => word[0].toUpperCase() + word.substring(1));

            return wordsUpper.join(' ');
        });
    }

    constructor() {
        this.readDb();
    }

    async find(location = '') {
        // http request
        // console.log('city->location: ', location);
        try {
            const mapbox = new Mapbox({});

            const info = await mapbox.fetch(location);

            return info.features.map(place => ({
                id: place.id,
                place_name: place.place_name,
                longitude: place.center[0],
                latitude: place.center[1]
            }));
        } catch (error) {
            return error;
        }
    }

    async weatherByCoordinates(lat, lon) {
        try {
            const openweather = new OpenWeather();

            const { description, temp, feels_like, temp_min, temp_max } = await openweather.fetch(lat, lon);

            return {
                description,
                temp,
                feels_like,
                temp_min,
                temp_max,
            };
        } catch (error) {
            return error;
        }
    }

    addHistory(place = '') {
        if (this.history.includes(place.toLocaleLowerCase())) {
            return;
        }

        this.history = this.history.splice(0, 5);

        this.history.unshift(place.toLocaleLowerCase());

        // Save in Db
        this.saveDb();
    }

    saveDb() {

        const payload = {
            history: this.history
        };

        fs.writeFileSync(this.dbFile, JSON.stringify(payload));
    }

    readDb() {
        if (!fs.existsSync(this.dbFile)) {
            return null;
        }
    
        const info = fs.readFileSync(this.dbFile, { encoding: 'utf-8' });
        console.log(info);

        this.history = JSON.parse(info).history;
    }
};