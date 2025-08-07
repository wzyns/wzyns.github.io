import { Link } from "gatsby";

export default function Header() {
  return (
    <header>
      <p>
        <Link to="/">
          <span className="text-lg font-medium">@wzyns</span>
        </Link>
        <span className="text-neutral-600">
          <span>,&nbsp;</span>
          이커머스 서비스를 개발하는 주니어 백엔드 개발자.
        </span>
      </p>
    </header>
  );
}
