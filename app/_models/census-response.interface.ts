export interface CensusResponse {
  status: string;
  responseTime: number;
  message: string[];
  Results: Results;
}

interface Results {
  series: Array<Serie>;
}

interface Serie {
  seriesID: string;
  data: Array<SerieData>;
}

export interface SerieData {
  year: number;
  period: string;
  periodName: string;
  latest: boolean;
  value: number;
  footnotes?: Array<any>;
  rate?: number;
  charIndex?: string;
}
