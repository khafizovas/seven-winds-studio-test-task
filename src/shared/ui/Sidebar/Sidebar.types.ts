export interface SidebarProps {
  items: SidebarItemProps[];
}

interface SidebarItemProps {
  label: string;
  isSelected?: boolean;
}
