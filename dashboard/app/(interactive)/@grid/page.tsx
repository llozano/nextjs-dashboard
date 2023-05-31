'use client';

import { useState } from 'react';

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title
} from "@tremor/react";
import { TrendingUpIcon, TrendingDownIcon } from "@heroicons/react/solid";

import { Census, Utils } from '../../lib';

export default async function Grid() {
  const data = await Census.fetchSerie('LNS13000000');
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

          <TableBody>
            {data.map((serie, index, dataSet) => {
              const key = `${index}-${serie.year}-${serie.period}`;
              const dir = (serie.rate > 0) ? <TrendingUpIcon className="sm-icon" />
                : (serie.rate < 0) ? <TrendingDownIcon className="sm-icon" /> : '';

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

        </Table>
      </Card>
    </>
  );
}
