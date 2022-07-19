// import dotenv from 'dotenv';
// dotenv.config();

import 'dotenv/config'

import { inquirerMenu, pause, readInput, listPlaces } from './helpers/inquirer.js';
import Searches from './models/searches.js';

const main = async () => {
    let option;

    const searches = new Searches();

    do {
        option = await inquirerMenu();
        // console.log({ option });

        switch (option) {
            case 1:
                // Show message

                const location = await readInput('City: ');
                // console.log(location);

                // Search citys
                const places = await searches.find(location);
                // console.log(places);

                // Show places y select one
                const selectedPlaceId = await listPlaces(places);
                // console.log({ selectedPlaceId });

                if (selectedPlaceId === 0) continue;

                const selectedPlace = places.find(place => selectedPlaceId === place.id);

                searches.addHistory(selectedPlace.place_name);

                // Get weather of the place
                const weather = await searches.weatherByCoordinates(selectedPlace.latitude, selectedPlace.longitude);
                // console.log({ weather });

                // Show weather oh the place
                console.log('\nInformation of the city\n'.green);
                console.log('City: ', selectedPlace.place_name.green);
                console.log('Latitude: ', selectedPlace.latitude);
                console.log('Longitude: ', selectedPlace.longitude);
                console.log('T°: ', weather.temp, '-', weather.description.green, '- Feels like: ', weather.feels_like);
                console.log('Min. T°: ', weather.temp_min);
                console.log('Max. T°: ', weather.temp_max);

                break;

            case 2:
                // console.log(searches.history);
                searches.capitalizeHistory.forEach((place, index) => {
                    const id = `${++index}.`.green;
                    console.log(`${id} ${place}`);
                });

                break;

            default:
                break;
        }

        if (option !== 0) await pause();

    } while (option !== 0);
};

main();