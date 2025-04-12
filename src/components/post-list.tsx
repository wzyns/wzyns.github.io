export default function PostList({ posts }: { posts: any[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>
          <PostListItem post={post} />
        </li>
      ))}
    </ul>
  );
}

function PostListItem({ post }: { post: any }) {
  return (
    <div className="mb-10">
      <p className="font-medium">{post.frontmatter.title}</p>
      <p className="mt-2 text-sm text-neutral-500">{post.frontmatter.date}</p>
      <p className="mt-2 text-sm">{post.excerpt}</p>
    </div>
  );
}
