import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Menu = ({ isExpanded }: { isExpanded: boolean }) => {
  const router = useRouter();

  return (
    <nav
      className={`${
        isExpanded ? `flex-col flex-1 items-center absolute top-0 w-full right-0 mt-16 bg-black ` : `hidden`
      } flex justify-end lg:flex lg:w-auto`}
    >
      <Link href="/">
        <a
          className={`${
            router.pathname === '/' ? 'border-solid border-turquois border-b-3' : ''
          } block text-center h-16 font-roboto-mono text-turquois text-base uppercase tracking-widest-2 px-4 py-1 hover:border-solid hover:text-ultralight-turquois hover:border-turquois hover:border-b-3`}
          style={{ lineHeight: '56px' }}
        >
          Dashboard
        </a>
      </Link>
      <Link href="/all-in-one">
        <a
          className={`${
            router.pathname === '/all-in-one' ? 'border-solid border-turquois border-b-3' : ''
          } block text-center h-16 font-roboto-mono text-turquois text-base uppercase tracking-widest-2 px-4 py-1 hover:border-solid hover:text-ultralight-turquois hover:border-turquois hover:border-b-3`}
          style={{ lineHeight: '56px' }}
        >
          All in One
        </a>
      </Link>
      <Link href="/doubling-times">
        <a
          className={`${
            router.pathname === '/doubling-times' ? 'border-solid border-turquois border-b-3' : ''
          } block text-center h-16 font-roboto-mono text-turquois text-base uppercase tracking-widest-2 px-4 py-1 hover:border-solid hover:text-ultralight-turquois hover:border-turquois hover:border-b-3`}
          style={{ lineHeight: '56px' }}
        >
          Doubling Times
        </a>
      </Link>
    </nav>
  );
};

export default Menu;
