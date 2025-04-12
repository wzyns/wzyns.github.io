export interface Post {
  id: string;

  frontmatter: {
    title: string;
    date: string;
  };

  fields: {
    slug: string;
  };

  excerpt: string;
  html: string;
}
