import { Sidebar } from 'src/shared';

import { SIDEBAR_ITEMS } from '../../config';

export default function LayoutSidebar() {
  return <Sidebar items={SIDEBAR_ITEMS} />;
}
