import { LayoutProps } from './Layout.types';
import styles from './Layout.style.module.scss';

export default function Layout(props: LayoutProps) {
  const { header, sidebar, main } = props;

  return (
    <div className={styles.layout}>
      {header}
      <div className={styles.content_wrapper}>
        {sidebar}
        <div className={styles.main_wrapper}>{main}</div>
      </div>
    </div>
  );
}
