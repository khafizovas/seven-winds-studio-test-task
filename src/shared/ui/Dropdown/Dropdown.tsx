import { DropdownProps } from './Dropdown.types';
import styles from './Dropdown.style.module.scss';

import DownArrow from 'src/shared/assets/icons/arrow_down.svg';

export default function Dropdown(props: DropdownProps) {
  const { selectedItem } = props;

  return (
    <div className={styles.dropdown}>
      {selectedItem}
      <DownArrow />
    </div>
  );
}
