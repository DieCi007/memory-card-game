import axios from 'axios';
import { IApiResponse } from '../model/IApiResponse';
import { ISeriesKey } from '../model/ISeriesKey';
import { ISeries } from '../model/ISeries';

class AmiiboClient {
    baseUrl: string;

    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL || '';
    }

    getSeriesKeys(): Promise<IApiResponse<ISeriesKey>> {
        return axios.get(this.baseUrl + '/amiiboseries').then(res => res.data)
    }

    getSeriesByKey(key: string): Promise<IApiResponse<ISeries>> {
        return axios.get(this.baseUrl + `/amiibo/?amiiboSeries=${key}`).then(res => res.data)
    }
}

export const client = new AmiiboClient();
