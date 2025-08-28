---
title: "JDK 25"
date: "2025-08-28 00:00:00"
---

2025년 9월 16일, JDK 25 출시를 앞두고 있다.
2023년 9월 JDK 21 출시 이후 2년 만의 LTS 버전이다.

https://openjdk.org/projects/jdk/25

- [470: PEM Encodings of Cryptographic Objects (Preview)](https://openjdk.org/jeps/470) - PEM 형식으로 암호화 객체를 인코딩/디코딩할 수 있도록 지원하는 기능 (프리뷰)
- [502: Stable Values (Preview)](https://openjdk.org/jeps/502) - 값의 불변성과 스레드 안전성을 보장하는 새로운 값 전달 메커니즘 도입 (프리뷰)
- [503: Remove the 32-bit x86 Port](https://openjdk.org/jeps/503) - 32비트 x86 아키텍처 지원 제거
- [505: Structured Concurrency (Fifth Preview)](https://openjdk.org/jeps/505) - 구조적 동시성 API로 여러 작업을 구조적으로 관리하고 오류 처리를 단순화 (5번째 프리뷰)
- [506: Scoped Values](https://openjdk.org/jeps/506) - 스레드 간 안전하게 값을 전달할 수 있는 새로운 메커니즘 도입
- [507: Primitive Types in Patterns, instanceof, and switch (Third Preview)](https://openjdk.org/jeps/507) - 패턴 매칭, instanceof, switch에서 기본 타입(primitive type) 지원 확대 (3번째 프리뷰)
- [508: Vector API (Tenth Incubator)](https://openjdk.org/jeps/508) - 벡터 연산을 위한 API 제공, SIMD 명령어를 활용해 성능 향상 (10번째 인큐베이터)
- [509: JFR CPU-Time Profiling (Experimental)](https://openjdk.org/jeps/509) - JFR(Java Flight Recorder)에서 CPU 시간 기반 프로파일링 지원 (실험적)
- [510: Key Derivation Function API](https://openjdk.org/jeps/510) - 암호화 키 파생 함수(KDF)를 위한 표준 API 제공
- [511: Module Import Declarations](https://openjdk.org/jeps/511) - 모듈 선언에서 외부 모듈을 더 명확하게 임포트할 수 있도록 개선
- [512: Compact Source Files and Instance Main Methods](https://openjdk.org/jeps/512) - 소스 파일을 더 간결하게 작성하고, 인스턴스 메인 메서드 지원
- [513: Flexible Constructor Bodies](https://openjdk.org/jeps/513) - 생성자 본문에서 더 유연한 코드 작성이 가능하도록 개선
- [514: Ahead-of-Time Command-Line Ergonomics](https://openjdk.org/jeps/514) - AOT(사전 컴파일) 관련 커맨드라인 사용성 개선
- [515: Ahead-of-Time Method Profiling](https://openjdk.org/jeps/515) - AOT 컴파일 시 메서드 프로파일링 기능 추가
- [518: JFR Cooperative Sampling](https://openjdk.org/jeps/518) - JFR에서 협력적 샘플링(Cooperative Sampling) 지원
- [519: Compact Object Headers](https://openjdk.org/jeps/519) - 객체 헤더를 더 작게 만들어 메모리 사용 최적화
- [520: JFR Method Timing & Tracing](https://openjdk.org/jeps/520) - JFR에서 메서드 타이밍 및 트레이싱 기능 강화
- [521: Generational Shenandoah](https://openjdk.org/jeps/521) - Shenandoah GC에 세대별(Generational) 수집 기능 추가
