import styles from '../styles/Header.module.scss';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useInput } from '../hoc/useInput';
import Input from '../components/ui/Input';
import SignModal from '../components/sign/SignModal';
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [openStatus, setOpenStatus] = useState({ open: false, value: null });
  const { onLogout, isLoggedIn } = useContext(AuthContext);

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

  // Sign 모달 이벤트
  const handleOpen = (e) => {
    setOpenStatus({ open: true, value: e.target.textContent });
  };

  const handleClose = () => {
    setOpenStatus({ open: false, value: null });
  };

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
        {!isLoggedIn ? (
          <>
            <button
              className={styles.button}
              onClick={handleOpen}
            >
              Sign In
            </button>
            <button
              className={styles.button}
              onClick={handleOpen}
            >
              Sign Up
            </button>
          </>
        ) : (
          <button
            className={styles.button}
            onClick={onLogout}
          >
            Sign out
          </button>
        )}
        <SignModal
          status={openStatus}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default Header;
