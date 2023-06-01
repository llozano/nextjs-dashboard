// 'use client';

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
  Title,
  Divider
} from "@tremor/react";
import { TrendingUpIcon, TrendingDownIcon } from "@heroicons/react/solid";

import { Census } from '../../lib';

export default async function Grid() {
  const data = await Census.fetchSerie('LNS13000000', 'desc');
  console.log('pew pew.1', 'grid', Date.now());

  return (
    <>
      <Card className="mt-5 mb-5">

        <Table className="mt-5 h-96 overflow-y-auto">

          <TableHead>
            <TableRow>
              <TableHeaderCell className="bg-white">Year</TableHeaderCell>
              <TableHeaderCell className="bg-white">Month</TableHeaderCell>
              <TableHeaderCell className="bg-white">Rate</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((serie, index, dataSet) => {
              const key = `${index}-${serie.year}-${serie.period}`;
              const dir = (serie.rate! > 0) ? <TrendingUpIcon className="sm-icon" />
                : (serie.rate! < 0) ? <TrendingDownIcon className="sm-icon" /> : '';

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
                      <Text>{serie.rate!.toFixed(2)}% {dir}</Text>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>

        </Table>

        <Divider />
      </Card>
    </>
  );
}
