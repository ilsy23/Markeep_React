import styles from "../../styles/CardPrivate.module.scss";
import { Link } from "react-router-dom";

const CardPrivate = ({ id, url, title, tags }) => {
  return (
    <div>
      <div className={styles.wrap}>
        <Link to={`/view/folders${id}`}>
          <div className={styles.image_box}>
            <img src={url} alt="폴더 이미지" />
          </div>
          <h4>{title}</h4>
          <div className={styles.tag_box}>
            {tags.map((tag, idx) => {
              return (
                <div key={idx} className={styles.tag}>
                  {tag}
                </div>
              );
            })}
          </div>
        </Link>
        <div className={styles.check}>
          <input className={styles.check_item} type="checkbox" value={id} />
        </div>
      </div>
    </div>
  );
};

export default CardPrivate;
