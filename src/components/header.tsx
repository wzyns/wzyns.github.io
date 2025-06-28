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
          이커머스 서비스를 개발하는 주니어 백엔드 개발자. 자바를 중심으로
          다양한 데이터 시스템을 활용하며, 안정적이고 확장 가능한 구조에 대한
          이해를 넓혀가고 있다. 그런 서비스를 스스로 설계할 수 있는 엔지니어가
          되는 것이 현재의 목표다.
        </span>
      </p>
    </header>
  );
}
