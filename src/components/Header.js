import React, { useState } from 'react';
import styles from '../styles/Header.module.scss';
import Input from './Input';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');

  const getSearchData = (e) => {
    setSearchInput(e.target.value);
  };

  const clickSearchHandler = async () => {};

  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.title}
        to={'/'}
      >
        MarKeep
      </Link>
      <div className={styles.search}>
        <Input>
          <input
            type='text'
            placeholder='검색어를 입력해 주세요.'
            onChange={getSearchData}
          />
          <div
            className={styles.icon_box}
            onClick={clickSearchHandler}
          >
            <SearchIcon className={styles.icon} />
          </div>
        </Input>
      </div>
      <div className={styles.sign_box}>
        <button className={styles.button}>Sign In</button>
        <button className={styles.button}>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
