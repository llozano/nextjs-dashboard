import { cache } from 'react';
import { CensusResponse } from '../_models/census-response.interface';

export class Census {

  static fetchSeriesCached = cache(async (seriesId: Array<string>) => {
    return await Census.fetchSeries(seriesId);
  });

  static async fetchSeries(seriesId: Array<string>): Promise<CensusResponse> {
    try {
      // const url = 'https://api.bls.gov/publicAPI/v2/timeseries/data/';
      // const payload = { seriesid : [...seriesId], startyear: 2012, endyear:2023 };
      //
      // const res = await fetch(url, {
      //   method: 'POST',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload)
      // });
      //
      // return res.json();
      //

      const response = require('./response.LNS13000000.json');

      return response;
    } catch (error: any) {
      console.log('fetch err', error);
      throw new Error('Error loading BLS.gov API', { cause: error });
    }
  }

}
