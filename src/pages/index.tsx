import { graphql } from "gatsby";
import Layout from "../components/layout";
import PostList from "../components/post-list";
import { Post } from "../models/post";

export default function MainPage({ data }: { data: FindAllQueryResult }) {
  const posts = data.allMarkdownRemark.nodes;
  return (
    <Layout>
      <PostList posts={posts} />
    </Layout>
  );
}

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
        }
        fields {
          slug
        }
        excerpt(pruneLength: 250, format: HTML, truncate: true)
        html
      }
    }
  }
`;

type FindAllQueryResult = {
  allMarkdownRemark: {
    nodes: Post[];
  };
};
