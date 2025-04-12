import { Link } from "gatsby";

export default function PostList({ posts }: { posts: any[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.fields.slug}>
          <PostListItem post={post} />
        </li>
      ))}
    </ul>
  );
}

function PostListItem({ post }: { post: any }) {
  return (
    <div className="mb-10">
      <Link to={`/posts/${post.fields.slug}`}>
        <p className="text-lg font-medium">{post.frontmatter.title}</p>
        <p className="mt-2 text-neutral-500">{post.frontmatter.date}</p>
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
      </Link>
    </div>
  );
}
