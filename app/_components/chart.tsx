'use client';

import React, { useState } from 'react';
import { LineChart, Toggle, ToggleItem } from "@tremor/react";
import { CalculatorIcon, ReceiptTaxIcon } from "@heroicons/react/solid";

import { SerieData } from '../_models/census-response.interface';

/**
 * Value formatter
 * @param  {number} value                    numeric value
 * @return {string}          formatted value
 */
const rateFormatter = (value: number): string =>
  `${Intl.NumberFormat("us").format(value)}%`;

const numberFormatter = (value: number): string =>
  `${Intl.NumberFormat("us").format(value)}`;

export const Chart = ({ data }: {
  data: Array<SerieData>
}) => {
  const [category, setCategory] = useState('rate');

  /**
   * Handle Toggle ValueChange event
   * @param  {string} value               Item value
   */
  const handleToggleValueChange = (value: string): void => {
    setCategory(value);
  };

  return (
    <>
      <Toggle defaultValue={category} onValueChange={(value) => handleToggleValueChange(value)}
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
    </>
  );
};
