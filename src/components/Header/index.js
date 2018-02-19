import React from 'react';
import Logo from '../../images/logo_contaAzul.png';
import './style.less';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <a href="" className="pure-menu-heading">
          <img src={Logo} className="logo" alt="Logo conta azul" />
        </a>
      </div>
    </header>
  );
};

export default Header;
