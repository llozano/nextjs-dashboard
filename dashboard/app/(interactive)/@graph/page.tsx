import { Card, Title } from "@tremor/react";

import { Census } from '../../lib';
import { Chart } from '../../_components';

export default async function Graph() {
  const data = await Census.fetchSerie('LNS13000000');

  console.log('pew pew.5', 'graph', Date.now());

  return (
    <Card>
      <Title>Unemployment Growth for the last 10 years</Title>

      <Chart data={data}  />
    </Card>
  );
}
