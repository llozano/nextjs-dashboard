import Page from './page';

export default async function Default() {
  // @ts-expect-error Async Component
  return <Page {...props} />;
}
