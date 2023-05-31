'use client';

import React from 'react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

const routes = require('../_config/topnav.json');

export const TopNav = ({ children } : { children?: React.ReactNode }) => {
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <div className="navbar-expand-md">
            <span className="navbar-brand mb-0 h1">Navbar</span>

            <ul className="d-inline-flex navbar-nav">
              {routes.links.map((route: any) => {
                const active = (route.href.replace('/', '') === segment || '') ? 'active' : '';

                return (
                  <li className="nav-item" key={`navl-${route.id}`}>
                    <Link className={`nav-link ${active}`} href={route.href}>
                      {route.label}
                    </Link>
                  </li>
                );
              })}

              {children}
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
};
