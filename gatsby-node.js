const { createFilePath } = require("gatsby-source-filesystem");

// https://github.com/wzyns/wzyns.github.io/issues/1
exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: "slug",
      value: createFilePath({
        node,
        getNode,
      }),
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 10000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  if (posts.length > 0) {
    posts.forEach((post) => {
      createPage({
        path: post.fields.slug,
        component: `${__dirname}/src/templates/post.tsx`,
        context: {
          id: post.id,
        },
      });
    });
  }
};
