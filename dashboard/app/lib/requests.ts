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

  static fetchSerie = cache(async (serieId) => {
    const { Results: { series } } = await Census.fetchSeries([serieId]);
    // Select requested serie
    let data = series
      .find(serie => serie.seriesID === serieId)?.data || [];

      // Transform values
      data = data.map((serie, idx, dataset) => {
        serie.rate = Utils.calcRateChange(serie.value, dataset[idx + 1]?.value);
        serie.charIndex = `${serie.periodName.slice(0, 3)} ${serie.year}`;

        return serie;
      });

      // Sorting values
      data.sort((a, b) => {
        return (a.year > b.year) ? 1 : (a.year < b.year) ? -1
          : (a.period > b.period) ? 1 : (a.period < b.period) ? -1 : 0;
      });

      return data;
  });

}
