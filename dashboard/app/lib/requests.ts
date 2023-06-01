import { cache } from 'react';
import { CensusResponse, SerieData } from '../_models/census-response.interface';
import { Utils } from './utils';

interface SortDirection {
  gr: number;
  equal: number;
  lw: number;
}

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

  static fetchSerie = cache(async (serieId: string, sort: 'asc' | 'desc' = 'asc') => {
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

      const dir: SortDirection = (sort === 'asc') ? { gr: 1, equal: 0, lw: -1}
        : { gr: -1, equal: 0, lw: 1};

      // Sorting values
      const sortFn = (a: SerieData, b: SerieData) => (a.year > b.year) ? dir.gr : (a.year < b.year) ? dir.lw
          : (a.period > b.period) ? dir.gr : (a.period < b.period) ? dir.lw : dir.equal;

      data.sort(sortFn);

      return data;
  });

}
