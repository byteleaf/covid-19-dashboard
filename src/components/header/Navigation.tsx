import React, { useState } from 'react';
import Logo from './Logo';
import Menu from './Menu';
import MenuExpandButton from './MenuExpandButton';

const Navigation = () => {
  const [isExpanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!isExpanded);
  };

  return (
    <header>
      <div className="bg-black center fixed z-50 top-0 w-full">
        <div className="flex justify-between items-center h-16 px-4">
          <Logo />
          <Menu isExpanded={isExpanded} />
          <MenuExpandButton toggleExpansion={toggleExpansion} />
        </div>
      </div>
    </header>
  );
};
export default Navigation;
