import { Link } from "gatsby";

export default function Header() {
  return (
    <header className="flex flex-row justify-between align-middle">
      <Link to="/">
        <h1 className="text-lg font-medium">wish.in</h1>
      </Link>
      <Navigator />
    </header>
  );
}

function Navigator() {
  return (
    <nav>
      <ul className="flex flex-row justify-end align-middle text-neutral-500 [&>li]:ml-5">
        <li>
          <Link to="https://github.com/wish-in">GitHub</Link>
        </li>
      </ul>
    </nav>
  );
}
