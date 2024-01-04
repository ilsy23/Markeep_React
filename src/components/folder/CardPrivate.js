import styles from '../../styles/CardPrivate.module.scss';
import { Link, useLocation } from 'react-router-dom';

const CardPrivate = ({ id, data, url, title, tags, setChecked }) => {
  const location = useLocation();

  const handleCheckClick = (e) => {
    if (e.target.checked) {
      setChecked((prev) => [...prev, e.target.value]);
    }
  };

  return (
    <div>
      <div className={styles.wrap}>
        <Link
          to={`/view/folders/${id}`}
          state={{ previousLocation: location, data: data }}
        >
          <div className={styles.image_box}>
            <img
              src={url}
              alt='폴더 이미지'
            />
          </div>
          <h4>{title}</h4>
          <div className={styles.tag_box}>
            {tags.map((tag, idx) => {
              return (
                <div
                  key={idx}
                  className={styles.tag}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </Link>
        <div className={styles.check}>
          <input
            className={styles.check_item}
            type='checkbox'
            value={id}
            onClick={handleCheckClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CardPrivate;
