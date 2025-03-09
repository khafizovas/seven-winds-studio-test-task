import { Dropdown, Header, NavItem, SelectedDropdownItem } from 'src/shared';

import HomeIcon from 'src/shared/assets/icons/home.svg';
import BackIcon from 'src/shared/assets/icons/back.svg';

export default function LayoutHeader() {
  return (
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
            <SelectedDropdownItem
              heading="Название проекта"
              description="Аббревиатура"
            />
          }
        />
      }
      mainContent="Строительно-монтажные работы"
    />
  );
}
