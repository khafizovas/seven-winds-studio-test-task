import { NavItemProps } from './NavItem.types';
import styles from './NavItem.style.module.scss';

export default function NavItem(props: NavItemProps) {
  const { label, isSelected = false } = props;

  return (
    <div className={(isSelected && styles.nav_item_selected) || undefined}>
      {label}
    </div>
  );
}
