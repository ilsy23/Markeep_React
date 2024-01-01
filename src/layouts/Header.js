import styles from '../styles/Header.module.scss';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hoc/useInput';
import Input from '../components/ui/Input';

const Header = () => {
  // 검색 요청
  const handleSearchClick = () => {
    navigate(`/${keyword}`);
    inputRef.current.blur();
  };

  const {
    inputRef,
    keyword,
    handleInputChange,
    // HandleCancelClick,
    handleKeyDown,
  } = useInput('', handleSearchClick);

  const navigate = useNavigate();

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
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <div
            className={styles.icon_box}
            onClick={handleSearchClick}
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
