'use client';

import React, { useState, useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Grid, Col, Card, Title, Subtitle, TabList, Tab, Flex, Divider } from "@tremor/react";
import { ChartBarIcon, TableIcon } from "@heroicons/react/solid";


export default function InteractivePage(
  { searchParams }
  : { searchParams : { tab : string }}
) {
  const [isPending, startTransition] = useTransition();
  const selectedTab = searchParams.tab ?? 'graph';
  const [tabValue, setTabValue] = useState(selectedTab);
  const { replace } = useRouter();
  const pathname = usePathname();


  const updateSearchUrl = ({ tabValue } : { tabValue: string }) => {
    const params = new URLSearchParams(window.location.search);

    console.log('pew pew.4.1', 'main page', tabValue, Date.now());
    params.set('tab', tabValue);

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleTabListValueChange = (value: string): void => {
    setTabValue(value);

    updateSearchUrl({ tabValue: value });
  };

  return (
    <>
      <Divider />

      <Title>Labor Force Statistics from the Current Population Survey</Title>
      <Subtitle>Unemployment Level</Subtitle>

      <TabList className="mt-5" defaultValue={selectedTab}
        onValueChange={(value) => handleTabListValueChange(value)}>
        <Tab value="graph" text="Graph" icon={ChartBarIcon}></Tab>
        <Tab value="dataset" text="Dataset" icon={TableIcon}></Tab>
      </TabList>

    </>
  );
};
