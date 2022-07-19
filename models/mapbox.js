import Axios from 'axios';

export default class Mapbox {

    baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

    get params() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'proximity': 'ip',
            'language': 'en',
        }
    }

    instance = null;

    constructor(params = {}) {
        // ${location}.json
        this.instance = Axios.create({
            baseURL: this.baseUrl,
            params: Object.assign({}, this.params, params)
        });
    }

    async fetch(location = '') {
        try {
            // const result = await Axios.get('');
            const result = await this.instance.get(`${location}.json`);
            // console.log(result.data.features);
            // console.log('result.data.features.length: ', result.data.features.length);

            return result.data;
        } catch (error) {
            throw `error mapbox getting data ${error}`;
        }
    }
}