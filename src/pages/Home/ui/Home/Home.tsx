import { Layout } from 'src/shared';

import { HomeProps } from './Home.types';

export default function Home(props: HomeProps) {
  console.log('Debug component Home', props);

  // TODO: Переименуйте .Home в snake_case
  return <Layout />;
}
