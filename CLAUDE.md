# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@docs/spec.md

## Overview

마크다운 파일 기반의 SSG 개인 블로그. 파일 탐색기 UI로 포스트를 탐색하는 컨셉.

## Commands

- `npm run dev` — 개발 서버 (이미지 에셋 복사 포함)
- `npm run build` — 정적 빌드 (`out/` 디렉터리에 출력)
- `npm run lint` — ESLint

## Tech Stack

- Next.js 16 (App Router, `output: "export"`)
- TypeScript, Tailwind CSS v4 (@tailwindcss/typography)
- Markdown: unified (remark-parse → remark-gfm → remark-rehype → rehype-slug → rehype-autolink-headings → rehype-shiki → rehype-stringify)
- Shiki (github-dark theme) — 마크다운 코드블록 및 소스코드 뷰어 모두 사용

## Architecture

- `posts/` — 마크다운 및 소스코드 파일. 실제 디렉터리 구조가 URL과 파일 탐색기 뷰에 그대로 매핑됨.
- `src/app/[...slug]/page.tsx` — 핵심 라우트. slug가 디렉터리/마크다운/소스코드인지에 따라 세 가지 뷰를 분기 렌더링. `getAllPaths()`로 `generateStaticParams` 생성.
- `src/lib/posts.ts` — 파일시스템 읽기, 경로 순회, 마크다운 렌더링, 코드 하이라이팅 등 핵심 데이터 레이어. 이미지 파일 필터링 정책(`imageExtensions`)이 여기에 정의되어 있으며, 파일 탐색기와 사이트맵이 동일한 기준을 공유함.
- `src/components/` — UI 컴포넌트. `"use client"` 컴포넌트(`local-date.tsx`, `giscus.tsx`)는 클라이언트 사이드 동작이 필요한 경우에만 사용.
- `scripts/copy-post-assets.ts` — 빌드 전 `posts/` 내 이미지를 `public/posts/`로 복사하는 prebuild 스크립트.