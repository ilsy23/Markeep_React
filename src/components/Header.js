import React from 'react';
import serachIcon from '../assets/img/search.svg';
import './Header.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className='content'>
        <div className='logo'>MarKeep</div>
        <div className='input-box'>
          <input
            className='search'
            placeholder='검색어를 입력하세요.'
          />
          <img
            className='icon'
            alt='Icon'
            src={serachIcon}
          />
        </div>
      </div>
      <div className='sign-box'>
        <div className='sign-text'>Sign In</div>
        <div className='sign-text'>Sign Out</div>
      </div>
    </div>
  );
};

export default Header;
