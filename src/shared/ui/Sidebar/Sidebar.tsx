import TilesIcon from 'src/shared/assets/icons/tiles.svg';

import { SidebarProps } from './Sidebar.types';
import styles from './Sidebar.style.module.scss';

export default function Sidebar(props: SidebarProps) {
  const { items } = props;

  return (
    <div className={styles.sidebar}>
      {items.map((item) => (
        <div
          key={item.label}
          className={[styles.item, item.isSelected && styles.selected_item]
            .filter(Boolean)
            .join(' ')}
        >
          <TilesIcon />
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
