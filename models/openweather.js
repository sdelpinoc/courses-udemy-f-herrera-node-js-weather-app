import Axios from 'axios';

export default class OpenWeather {

    baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    // lat=-70.66667&lon=40.740121&appid=909e50ff88e5288c0ea873509714ef6a&units=metric&lang=es

    get params() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'en',
        }
    }

    instance = null;

    constructor() {
    }

    async fetch(lat, lon) {
        try {

            this.instance = Axios.create({
                baseURL: this.baseUrl,
                // params: Object.assign({}, this.params, params)
                params: { ...this.params, lat, lon }
            });

            const result = await this.instance.get();
            // console.log(result.data);
            const { weather, main } = result.data;
            // console.log({weather});
            return {
                'description': weather[0].description,
                'temp': main.temp,
                'feels_like': main.feels_like,
                'temp_min': main.temp_min,
                'temp_max': main.temp_max,
            };
        } catch (error) {
            throw `error openweather getting data ${error}`;
        }
    }
}