import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/Modal.module.scss';

const Modal = () => {
  let navigate = useNavigate();
  const location = useLocation().state.previousLocation;

  return (
    <div
      className={styles.background}
      onClick={() => navigate(location)}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Modal;
