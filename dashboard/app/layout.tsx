import './globals.scss';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Grid, Col, Card, Text, Metric } from "@tremor/react";

import { TopNav } from './_components';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'NextJS, Bootstrap',
  authors: [{ name: 'Leonardo Lozano' }],
  viewport: {
   width: 'device-width',
   initialScale: 1,
   maximumScale: 1
 }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className="dark h-full">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="h-full dark:bg-slate-800">

        <header>
          <TopNav></TopNav>
        </header>

        <main className="mt-7">
          <Grid numCols={1} className="gap-2">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </ Grid>
        </main>

        <footer>
        </footer>
      </body>
    </html>
  );
}
