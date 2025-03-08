import { LayoutProps } from './Layout.types';
import styles from './Layout.style.module.scss';

import HomeIcon from 'src/shared/assets/icons/home.svg';
import BackIcon from 'src/shared/assets/icons/back.svg';

// TODO: Закинуть что-то в entities/
// TODO: Переместить сборку конструктора в widgets/
import { Header } from '../Header';
import { NavItem } from '../NavItem';
import { Dropdown } from '../Dropdown';

import { Sidebar } from '../Sidebar';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Layout(props: LayoutProps) {
  // TODO: Передавать как пропсы
  const sidebarItems = [
    { label: 'По проекту' },
    { label: 'Объекты' },
    { label: 'РД' },
    { label: 'МТО' },
    { label: 'СМР', isSelected: true },
    { label: 'График' },
    { label: 'МиМ' },
    { label: 'Рабочие' },
    { label: 'Капвложения' },
    { label: 'Бюджет' },
    { label: 'Финансирование' },
    { label: 'Панорамы' },
    { label: 'Камеры' },
    { label: 'Поручения' },
    { label: 'Контрагенты' },
  ];
  //

  return (
    <div className={styles.layout}>
      <Header
        topContent={{
          icons: [<HomeIcon key="home_icon" />, <BackIcon key="back_icon" />],
          navItems: [
            <NavItem key="watch" label="Просмотр" isSelected />,
            <NavItem key="edit" label="Управление" />,
          ],
        }}
        sidebarContent={
          <Dropdown
            selectedItem={
              <DropdownContent
                heading="Название проекта"
                description="Аббревиатура"
              />
            }
          />
        }
        mainContent="Строительно-монтажные работы"
      />
      <Sidebar items={sidebarItems} />
    </div>
  );
}

// TODO: Убрать отсюда
interface DropdownContentProps {
  heading: string;
  description: string;
}

function DropdownContent(props: DropdownContentProps) {
  const { heading, description } = props;

  return (
    <div>
      <div>{heading}</div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
//
