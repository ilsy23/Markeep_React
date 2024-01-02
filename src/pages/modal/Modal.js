import { Outlet, useNavigate } from "react-router-dom";
import styles from "../../styles/Modal.modlue.scss";

const Modal = () => {
  let navigate = useNavigate();

  return (
    <div className={styles.background} onClick={() => navigate(-1)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Outlet />
      </div>
    </div>
  );
};

export default Modal;
