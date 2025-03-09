import { useWorkData } from 'src/entities';

import styles from './WorkTableMessage.style.module.scss';

export default function WorkTableMessage() {
  const { works, isLoading, isError, error } = useWorkData();

  const messageText =
    (isLoading && 'Загрузка...') ||
    (isError && `Ошибка: ${JSON.stringify(error)}.`) ||
    (!Array.isArray(works) && 'Что-то пошло не так...') ||
    null;

  return (
    messageText && (
      <tr className={styles.message}>
        <td>{messageText}</td>
      </tr>
    )
  );
}
