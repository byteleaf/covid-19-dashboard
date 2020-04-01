import React from 'react';
import Link from 'next/link';

const Footer = () => (
  <div className="py-6 px-8 lg:px-12 flex justify-between bg-blue-grey">
    <div className="flex flex-wrap pt-0" style={{ paddingTop: 0 }}>
      <Link href="https://www.byteleaf.de/impressum">
        <a className="uppercase text-light-grey tracking-widest text-sm pr-4">Impressum</a>
      </Link>
      <Link href="https://www.byteleaf.de/datenschutz">
        <a className="uppercase text-light-grey tracking-widest text-sm pr-4">Datenschutz</a>
      </Link>
    </div>
    <div className="text-sm uppercase text-light-grey tracking-widest" style={{ paddingBottom: 0 }}>
      {`© ${new Date().getFullYear()} - Code: byteleaf`}
    </div>
  </div>
);

export default Footer;
