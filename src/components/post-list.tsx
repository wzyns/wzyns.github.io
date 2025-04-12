import { Link } from "gatsby";
import { Post } from "../models/post";

export default function PostList({ posts }: { posts: Post[] }) {
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

function PostListItem({ post }: { post: Post }) {
  const isTruncated = post.excerpt.length < post.html.length;

  return (
    <div className="mb-10">
      <Link to={post.fields.slug}>
        <p className="text-lg font-medium">{post.frontmatter.title}</p>
      </Link>
      <p className="mt-3 text-neutral-500">{post.frontmatter.date}</p>
      <div
        className="mt-3"
        dangerouslySetInnerHTML={{ __html: post.excerpt }}
      />
      {isTruncated && (
        <Link to={post.fields.slug}>
          <p className="underline">(read more)</p>
        </Link>
      )}
    </div>
  );
}
