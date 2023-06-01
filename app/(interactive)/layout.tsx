'use client';

import { Suspense } from 'react';
import { Card, Flex } from "@tremor/react";
import { useSearchParams } from "next/navigation";

import { Census } from '../lib';

export const preload = (seriesId: string) => {
  void Census.fetchSeries([seriesId]);
};

export default function InteractiveLayout(props: any) {

  const seriesId = 'LNS13000000';
  preload(seriesId);


  const searchParams = useSearchParams();
  const viewDataset = (searchParams.get('tab') ?? 'graph') === 'dataset';

  console.log('pew pew.3', 'layout', searchParams.get('tab'), viewDataset, Date.now());

  return (
    <>

      <Card>
        {props.children}

        <Flex className="mt-5">
          {(!!viewDataset) ? ( <>{props.grid}</> )
            : ( <>{props.graph}</> )}
        </Flex>

      </Card>
    </>
  );
};
