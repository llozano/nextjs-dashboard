'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { Card, LineChart, Title, Icon, Toggle, ToggleItem } from "@tremor/react";
import { CalculatorIcon, ReceiptTaxIcon } from "@heroicons/react/solid";

import { Census, Utils } from '../../lib';

/**
 * Value formatter resolver
 * @param  {string} category               value category
 * @return {Function}          valueFormatter function
 */
const dataFormatter = (category: string) => {
  const formatterMap = {
    'rate': (number: number) =>
      `${Intl.NumberFormat("us").format(number)}%`,
    'value': (number: number) =>
      `${Intl.NumberFormat("us").format(number)}`
  };

  return formatterMap[category];
};

/**
 * Fetch and prepare the dataset
 * @return {Promise} [description]
 */
const prepDataset = async () => {
  const seriesId = 'LNS13000000';
  const { Results: { series } } = await Census.fetchSeries([seriesId]);
  // Select requested serie
  let data = series
    .find(serie => serie.seriesID === seriesId)?.data || [];

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
};

const Chart = async ({ category }: { category : string }) => {
  const data = await useMemo(async () => await prepDataset(), []);
  const valueFormatter = dataFormatter(category);

  return (
    <LineChart
      className="mt-6"
      data={data}
      index="charIndex"
      categories={[category]}
      colors={["emerald", "gray"]}
      valueFormatter={valueFormatter}
      yAxisWidth={40}
    />
  );
};

const CategoryToggle = (
  {handler, className} :
  { handler: (value: string) => void, className: string }
) => {
  const [category, setCategory] = useState('rate');

  const handleToggleValueChange = (value: string): void => {
    setCategory(value);
    handler(value);
  };

  return (
    <Toggle defaultValue={category} onValueChange={handleToggleValueChange}
      className={className}>
      <ToggleItem value="rate" text="Rate (%)" icon={ReceiptTaxIcon} />
      <ToggleItem value="value" text="Thousands" icon={CalculatorIcon} />
    </Toggle>
  );
}

export default async function Graph() {
  const [category, setCategory] = useState('rate');
  const data = await useMemo(async () => await prepDataset(), []);
  // const valueFormatter = dataFormatter(category);
  const className = 'mt-4';

  const handleToggleValueChange = (value: string): void => {
    console.log('pew pew.2', value);
    setCategory(value);
  };

  return (
    <Card>
      <Title>Unemployment Growth for the last 10 years</Title>

      {/*<CategoryToggle className="mt-4" handler={handleToggleValueChange} />*/}
      <Toggle defaultValue={category} onValueChange={handleToggleValueChange}
        className={className}>
        <ToggleItem value="rate" text="Rate (%)" icon={ReceiptTaxIcon} />
        <ToggleItem value="value" text="Thousands" icon={CalculatorIcon} />
      </Toggle>

      {/* @ts-expect-error Async Component */}
      {/* <Chart category={category} /> */}
      <LineChart
        className="mt-6"
        data={data}
        index="charIndex"
        categories={[category]}
        colors={["emerald", "gray"]}
        valueFormatter={dataFormatter(category)}
        yAxisWidth={40}
      />
    </Card>
  );
}
