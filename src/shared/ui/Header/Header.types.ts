import type { ReactElement } from 'react';

export interface HeaderProps {
  topContent: HeaderTopContentProps;
  sidebarContent: ReactElement;
  mainContent: string;
}

interface HeaderTopContentProps {
  icons: ReactElement[];
  navItems: ReactElement[];
}
