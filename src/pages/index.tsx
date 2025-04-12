import { graphql } from "gatsby";
import Layout from "../components/layout";
import Profile from "../components/profile";
import PostList from "../components/post-list";

export default function Home({ data }: { data: any }) {
  const posts = data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <Profile />
      <PostList posts={posts} />
    </Layout>
  );
}

export function Head() {
  return <title>Home</title>;
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        fields {
          slug
        }
        excerpt(pruneLength: 250, format: HTML, truncate: true)
      }
    }
  }
`;
