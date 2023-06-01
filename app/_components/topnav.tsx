'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Flex } from "@tremor/react";

const routes = require('../_config/topnav.json');

export const TopNav = ({ children }: { children?: React.ReactNode }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-sky-800 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">PoC</span>
        </div>

        <div className="block lg:hidden">
          <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            {routes.links.map((route: any) => {
              const active = (route.href.replace('/', '') === segment || '') ? 'text-teal-200' : '';

              return (

                <Link
                  key={`navl-${route.id}`}
                  className={`block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 ${active}`}
                  href={route.href}>
                  {route.label}
                </Link>

              );
            })}

            {children}

          </div>

        </div>
      </nav>
    </>
  );
};
