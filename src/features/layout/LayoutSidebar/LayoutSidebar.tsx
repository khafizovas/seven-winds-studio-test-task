import { Sidebar } from 'src/shared';

import { SIDEBAR_ITEMS } from './constants';

export default function LayoutSidebar() {
  return <Sidebar items={SIDEBAR_ITEMS} />;
}
