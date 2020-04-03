import React from 'react';

const Footer = () => (
  <div className="py-6 px-8 lg:px-12 flex flex-col lg:flex-row justify-between items-center bg-blue-grey">
    <div className="flex flex-wrap pb-4 lg:pb-0">
      <a href="https://www.byteleaf.de/impressum" className="uppercase text-light-grey tracking-widest text-sm pr-4">
        Impressum
      </a>
      <a href="https://www.byteleaf.de/datenschutz" className="uppercase text-light-grey tracking-widest text-sm pr-4">
        Datenschutz
      </a>
    </div>
    <div className="text-sm uppercase text-light-grey tracking-widest pb-4 lg:pb-0">
      <a href="https://github.com/CSSEGISandData/COVID-19">Data by CSSE at Johns Hopkins University</a>
    </div>
    <div className="text-sm uppercase text-light-grey tracking-widest">
      {`© ${new Date().getFullYear()} - Code: byteleaf`}
    </div>
  </div>
);

export default Footer;
