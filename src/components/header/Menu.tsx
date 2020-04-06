import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = ({ isExpanded }: { isExpanded: boolean }) => {
  const location = useLocation();

  return (
    <nav
      className={`${
        isExpanded ? `flex-col flex-1 items-center absolute top-0 w-full right-0 mt-16 bg-black ` : `hidden`
      } flex justify-end lg:flex lg:w-auto`}
    >
      <Link
        to="/"
        className={`${
          location.pathname === '/' ? 'border-solid border-turquois border-b-3' : ''
        } block text-center h-16 font-roboto-mono text-turquois text-base uppercase tracking-widest-2 px-4 py-1 hover:border-solid hover:text-ultralight-turquois hover:border-turquois hover:border-b-3`}
        style={{ lineHeight: '56px' }}
      >
        Dashboard
      </Link>
      <Link
        to="/page/daily-rates"
        className={`${
          location.pathname === '/page/daily-rates' ? 'border-solid border-turquois border-b-3' : ''
        } block text-center h-16 font-roboto-mono text-turquois text-base uppercase tracking-widest-2 px-4 py-1 hover:border-solid hover:text-ultralight-turquois hover:border-turquois hover:border-b-3`}
        style={{ lineHeight: '56px' }}
      >
        Daily Rates
      </Link>
      <Link
        to="/page/all-in-one"
        className={`${
          location.pathname === '/page/all-in-one' ? 'border-solid border-turquois border-b-3' : ''
        } block text-center h-16 font-roboto-mono text-turquois text-base uppercase tracking-widest-2 px-4 py-1 hover:border-solid hover:text-ultralight-turquois hover:border-turquois hover:border-b-3`}
        style={{ lineHeight: '56px' }}
      >
        All in One
      </Link>
      <Link
        to="/page/doubling-times"
        className={`${
          location.pathname === '/page/doubling-times' ? 'border-solid border-turquois border-b-3' : ''
        } block text-center h-16 font-roboto-mono text-turquois text-base uppercase tracking-widest-2 px-4 py-1 hover:border-solid hover:text-ultralight-turquois hover:border-turquois hover:border-b-3`}
        style={{ lineHeight: '56px' }}
      >
        Doubling Times
      </Link>
    </nav>
  );
};

export default Menu;
