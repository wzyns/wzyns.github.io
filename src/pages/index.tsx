import Layout from "../components/layout";

export default function IndexPage() {
  return (
    <Layout>
      <div>Hello, world!</div>
    </Layout>
  );
}

export function Head() {
  return <title>Home</title>;
}
