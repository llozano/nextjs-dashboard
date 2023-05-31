'use client';

import React, { useState, cache } from 'react';
import { Card, LineChart, Title, Toggle, ToggleItem } from "@tremor/react";
import { CalculatorIcon, ReceiptTaxIcon } from "@heroicons/react/solid";

import { Census, Utils } from '../../lib';

/**
 * Value formatter resolver
 * @param  {string} category               value category
 * @param  {number} num                    numeric value
 * @return {string}          formatted value
 */
const rateFormatter = (value: number): string =>
  `${Intl.NumberFormat("us").format(value)}%`;

const numberFormatter = (value: number): string =>
  `${Intl.NumberFormat("us").format(value)}`;


export default async function Graph() {
  const [category, setCategory] = useState('rate');
  const data = await Census.fetchSerie('LNS13000000');

  const handleToggleValueChange = (value: string): void => {
    console.log('pew pew.2', value);
    setCategory(value);
  };

  return (
    <Card>
      <Title>Unemployment Growth for the last 10 years</Title>

      <Toggle defaultValue={category} onValueChange={handleToggleValueChange}
        className="mt-4">
        <ToggleItem value="rate" text="Rate (%)" icon={ReceiptTaxIcon} />
        <ToggleItem value="value" text="Thousands" icon={CalculatorIcon} />
      </Toggle>

      <LineChart
        className="mt-6"
        data={data}
        index="charIndex"
        categories={[category]}
        colors={["emerald", "gray"]}
        valueFormatter={(category === 'rate') ? rateFormatter : numberFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}
