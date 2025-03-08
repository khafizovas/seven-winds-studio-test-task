import { Layout } from 'src/shared';
import { LayoutHeader, LayoutSidebar } from 'src/features';

import { PageLayoutProps } from './PageLayout.types';

export default function PageLayout(props: PageLayoutProps) {
  const { main } = props;

  return (
    <Layout header={<LayoutHeader />} sidebar={<LayoutSidebar />} main={main} />
  );
}
