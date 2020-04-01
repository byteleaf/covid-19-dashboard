import React from 'react';
import * as PropTypes from 'prop-types';

const MenuExpandButton = ({ toggleExpansion }: { toggleExpansion: () => void }) => (
  <div className="block lg:hidden">
    <button
      onClick={toggleExpansion}
      className="px-4 py-4 text-turquois border-turquois hover:text-white hover:border-white focus:outline-none"
      type="button"
    >
      <svg className="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </button>
  </div>
);

MenuExpandButton.propTypes = {
  toggleExpansion: PropTypes.func.isRequired,
};

export default MenuExpandButton;
