import Layout from "../components/layout";
import Profile from "../components/profile";

export default function IndexPage() {
  return (
    <Layout>
      <Profile />
      <div>Hello, world!</div>
    </Layout>
  );
}

export function Head() {
  return <title>Home</title>;
}
