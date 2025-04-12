import { graphql } from "gatsby";
import Layout from "../components/layout";
import { Post } from "../models/post";

export default function PostPage({
  data: { markdownRemark: post },
}: {
  data: FindOneQueryResult;
}) {
  return (
    <Layout>
      <h2 className="text-lg font-medium">{post.frontmatter.title}</h2>
      <p className="mt-3 text-neutral-500">{post.frontmatter.date}</p>
      <div
        className="prose mt-3"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostById($id: String!) {
    markdownRemark(id: { eq: $id }) {
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
`;

type FindOneQueryResult = {
  markdownRemark: Post;
};
