import { Outlet, useNavigate } from 'react-router-dom';

const Modal = () => {
  let navigate = useNavigate();

  return (
    <div
      style={{
        background: 'black',
        opacity: '0.3',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        left: 0,
        top: 0,
      }}
      onClick={() => navigate(-1)}
    >
      <div
        style={{ background: 'blue', width: '300px', height: '300px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Modal;
