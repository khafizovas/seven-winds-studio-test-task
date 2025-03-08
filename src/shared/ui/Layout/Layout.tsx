import { LayoutProps } from './Layout.types';
import styles from './Layout.style.module.scss';

export default function Layout(props: LayoutProps) {
  const { header, sidebar, main } = props;

  return (
    <div className={styles.layout}>
      {header}
      {sidebar}
      {main}
    </div>
  );
}
