'use client';

import { useState, useMemo } from 'react';

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
  Icon
} from "@tremor/react";
import { TrendingUpIcon, TrendingDownIcon, MailIcon } from "@heroicons/react/solid";

import { Census, Utils } from '../../lib';

const prepDataset = async () => {
  const seriesId = 'LNS13000000';
  const { Results: { series } } = await Census.fetchSeries([seriesId]);

  return series.find(serie => serie.seriesID === seriesId)?.data || [];
}

const TableResults = async () => {
  const data = await useMemo(async () => await prepDataset(), []);
  // const [data, setData] = useState(dataset);

  return (
    <TableBody>
      {data.map((serie, index, dataSet) => {
        const key = `${index}-${serie.year}-${serie.period}`;
        const rate = Utils.calcRateChange(serie.value, dataSet[index + 1]?.value);
        const dir = (rate > 0) ? <TrendingUpIcon className="sm-icon" />
          : (rate < 0) ? <TrendingDownIcon className="sm-icon" /> : '';

        return (
          <>
            <TableRow key={`tr-${key}`}>
              <TableCell scope="row">
                <Text>{serie.year}</Text>
              </TableCell>
              <TableCell>
                <Text>{serie.periodName}</Text>
              </TableCell>
              <TableCell>
                <Text>{rate.toFixed(2)}% {dir}</Text>
              </TableCell>
            </TableRow>
          </>
        );
      })}
    </TableBody>
  );
};

export default async function Grid() {
  // const data = await prepDataset();
  console.log('pew pew.1');

  return (
    <>
      <Card className="mt-5 mb-5">

        <Table className="mt-5">

          <TableHead>
            <TableRow>
              <TableHeaderCell>Year</TableHeaderCell>
              <TableHeaderCell>Month</TableHeaderCell>
              <TableHeaderCell>Rate</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableResults />

        </Table>
      </Card>
    </>
  );
}
