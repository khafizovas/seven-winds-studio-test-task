import type { WorkFieldInputProps } from './WorkFieldInput.types';
import styles from './WorkFieldInput.styles.module.scss';

export default function WorkFieldInput(props: WorkFieldInputProps) {
  const { editedValues, work, fieldName, onFieldChange, onFieldKeyDown } =
    props;

  const inputValue = editedValues[fieldName] || work?.[fieldName] || '';

  return (
    <input
      className={styles.input}
      type="text"
      value={String(inputValue)}
      onChange={onFieldChange}
      onKeyDown={onFieldKeyDown}
    />
  );
}
