import { graphql, StaticQueryDocument } from "gatsby";
import Layout from "../components/layout";

export default function PostPage({
  data: { markdownRemark: post },
}: {
  data: any;
}) {
  const {
    frontmatter: { title, date },
    html,
  } = post;

  return (
    <Layout>
      <h2 className="text-lg font-medium">{title}</h2>
      <p className="mt-3 text-neutral-500">{date}</p>
      <div className="prose mt-3" dangerouslySetInnerHTML={{ __html: html }} />
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
      html
    }
  }
`;
