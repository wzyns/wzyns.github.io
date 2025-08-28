---
title: "Java AOT 컴파일"
date: "2025-08-28 23:00:00"
---

## Java 버전별 AOT(Ahead-of-Time) 컴파일 지원 현황

Java의 AOT 컴파일(Ahead-of-Time Compilation)은 자바 바이트코드를 네이티브 코드로 미리 컴파일하여 애플리케이션의 시작 속도를 높이고, 특정 환경에서의 성능을 개선하기 위한 기능입니다. Java 버전별로 AOT 지원 현황과 변화는 다음과 같습니다.

### Java 9 ~ Java 16: 실험적 AOT 컴파일러(jaotc) 도입 및 제거

- **Java 9**
  - [JEP 295: Ahead-of-Time Compilation](https://openjdk.org/jeps/295)
  - `jaotc`라는 실험적 AOT 컴파일러가 도입됨.
  - Graal 컴파일러 기반으로, 일부 플랫폼(주로 Linux/x64)에서만 지원.
  - 명령어 예시:
    ```
    jaotc --output libHelloWorld.so HelloWorld.class
    ```
- **Java 10 ~ Java 16**
  - AOT 컴파일러가 계속 실험적 기능으로 유지됨.
  - 실제로는 제한적 환경에서만 사용되고, 널리 활용되지 않음.
- **Java 16**
  - [JEP 410: Remove the Experimental AOT and JIT Compiler](https://openjdk.org/jeps/410)
  - 실험적 AOT 및 JIT 컴파일러(Graal 기반) 완전 제거.
  - `jaotc` 명령어 및 관련 기능 삭제.

### Java 17 ~ Java 20: 공식 AOT 지원 없음

- AOT 컴파일러가 완전히 제거되어, 표준 OpenJDK에서는 AOT 기능을 사용할 수 없음.
- 네이티브 이미지를 원한다면 GraalVM Native Image 등 외부 프로젝트를 사용해야 함.

### Java 21: GraalVM Native Image의 일부 통합

- Java 자체에는 AOT 기능이 없지만, GraalVM Community Edition이 OpenJDK와 더 가까워지고, 일부 배포판(예: Oracle GraalVM for JDK 21)에서 Native Image 빌드 지원.
- 표준 OpenJDK에는 여전히 AOT 기능이 없음.

### Java 25: AOT 관련 기능의 재도입 및 개선

- **JEP 514: Ahead-of-Time Command-Line Ergonomics**
  - AOT 컴파일 관련 커맨드라인 사용성 개선.
  - AOT 컴파일을 좀 더 쉽게 사용할 수 있도록 명령어와 옵션이 개선됨.
- **JEP 515: Ahead-of-Time Method Profiling**
  - AOT 컴파일 시 메서드 프로파일링 기능 추가.
  - 더 효율적인 AOT 컴파일 결과를 얻을 수 있도록 지원.
- Java 25에서는 AOT 컴파일이 다시 실험적/인큐베이터 형태로 도입되고 있음.
  - 향후 표준화 및 안정화 여부는 추가적인 릴리스에서 결정될 예정.

---

## 요약 표

| Java 버전 | AOT 지원 현황 | 비고                                           |
| --------- | ------------- | ---------------------------------------------- |
| 9 ~ 16    | 실험적 지원   | `jaotc` 명령어, Graal 기반, 16에서 제거        |
| 17 ~ 20   | 미지원        | 표준 OpenJDK에서 완전 제거                     |
| 21        | 미지원(표준)  | GraalVM Native Image 등 외부 도구 필요         |
| 25        | 실험적 재도입 | JEP 514, 515 등, 커맨드라인 및 프로파일링 개선 |

---

## 참고

- [JEP 295: Ahead-of-Time Compilation](https://openjdk.org/jeps/295)
- [JEP 410: Remove the Experimental AOT and JIT Compiler](https://openjdk.org/jeps/410)
- [JEP 514: Ahead-of-Time Command-Line Ergonomics](https://openjdk.org/jeps/514)
- [JEP 515: Ahead-of-Time Method Profiling](https://openjdk.org/jeps/515)
- [GraalVM Native Image](https://www.graalvm.org/native-image/)
