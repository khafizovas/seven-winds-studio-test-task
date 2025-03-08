import { HeaderProps } from './Header.types';
import styles from './Header.style.module.scss';

export default function Header(props: HeaderProps) {
  const { topContent, sidebarContent, mainContent } = props;
  const { icons, navItems } = topContent;

  return (
    <div className={styles.header}>
      <div className={styles.header_top}>
        <div className={styles.header_top_icons}>{icons}</div>
        <div className={styles.header_top_navigation}>{navItems}</div>
      </div>
      <div className={styles.header_bottom}>
        <div className={styles.header_sidebar}>{sidebarContent}</div>
        <div className={styles.header_main}>{mainContent}</div>
      </div>
    </div>
  );
}
