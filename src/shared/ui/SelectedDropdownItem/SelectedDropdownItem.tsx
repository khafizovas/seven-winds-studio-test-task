import { SelectedDropdownItemProps } from './SelectedDropdownItem.types';
import styles from './SelectedDropdownItem.style.module.scss';

export default function SelectedDropdownItem(props: SelectedDropdownItemProps) {
  const { heading, description } = props;

  return (
    <div>
      <div>{heading}</div>
      <div className={styles.item_description}>{description}</div>
    </div>
  );
}
