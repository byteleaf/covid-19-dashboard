import React from 'react';

const Footer = () => (
  <div className="py-6 px-8 lg:px-12 flex justify-between bg-blue-grey">
    <div className="flex flex-wrap pt-0" style={{ paddingTop: 0 }}>
      <a href="https://www.byteleaf.de/impressum" className="uppercase text-light-grey tracking-widest text-sm pr-4">
        Impressum
      </a>
      <a href="https://www.byteleaf.de/datenschutz" className="uppercase text-light-grey tracking-widest text-sm pr-4">
        Datenschutz
      </a>
    </div>
    <div className="text-sm uppercase text-light-grey tracking-widest" style={{ paddingBottom: 0 }}>
      {`© ${new Date().getFullYear()} - Code: byteleaf`}
    </div>
  </div>
);

export default Footer;
