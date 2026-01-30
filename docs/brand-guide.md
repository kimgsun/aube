# AUBE (오브) - 비건 베이커리 브랜드

프로젝트 기획서 (포트폴리오용)

포트폴리오 프로젝트용으로 작성한 비건 베이커리 브랜드 AUBE(오브)의 웹사이트 기획·디자인 가이드입니다.

## 목차

- [Overview](#overview)
- [Brand Context](#brand-context)
- [Design System](#design-system)
- [Scope & Deliverables](#scope--deliverables)
- [Tech & Implementation](#tech--implementation)
- [File Structure](#file-structure)
- [Outcome](#outcome)

## Overview

| 항목           | 내용                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------- |
| **프로젝트명** | AUBE(오브) 공식 웹사이트                                                                            |
| **성격**       | 포트폴리오용 웹사이트 (비건 베이커리 가상 브랜드)                                                   |
| **한 줄 정의** | 새벽의 고요함이 빚어낸 미식의 순간을 전달하는 비건 베이커리 웹사이트                                |
| **목적**       | 기획·디자인·퍼블리싱 전 과정을 직접 수행해 보여주는 포트폴리오 결과물 제작                          |
| **역할**       | 기획 100% · 디자인 100% · 퍼블리싱 100% (1인 작업)                                                  |
| **결과물**     | 반응형 정적 웹사이트 8페이지 (index, about, product, product-detail, event, event-detail, location) |
| **기술 스택**  | HTML5, SCSS, JavaScript                                                                             |
| **특징**       | 시맨틱 마크업, BEM·SCSS 1단계 depth, JSON 기반 메뉴·이벤트 필터·동적 렌더링                         |

## Brand Context

웹 톤·콘텐츠 방향을 정하기 위한 브랜드 전제입니다.

**브랜드명: AUBE (오브)**  
프랑스어 Aube(새벽, 동틀 녘). 매일 새벽 가장 정직한 재료로 빵을 굽는 정성과, 비건 푸드가 선사하는 가벼우면서도 활기찬 시작을 담은 가상 브랜드.  
슬로건: _"새벽의 고요함이 빚어낸 미식의 순간 · The Ethics of Taste"_

**핵심 가치**

1. 동물성 재료 없이 빵·케이크·음료를 빚는 비건 베이커리
2. 정직한 재료와 천천히 발효하는 시간
3. 새벽의 고요함과 순수한 미식의 순간

**브랜드 스토리 요약**  
오브는 새벽에 굽는 빵의 온기, 비건이 선사하는 가벼운 활력을 전달한다. 문구는 **정제·온화·명확**을 기준으로 하고, 과장된 수식이나 투박한 표현은 쓰지 않는다.

**Strategy**  
메뉴·이벤트 접근성을 높이기 위해 카테고리 필터(메뉴: 전체/빵/케이크/커피, 이벤트: 진행중/예정/과거)와 JSON 기반 동적 렌더링을 채택. 스크롤 리빌(.reveal)로 섹션 노출 애니메이션, 네비 토글·ARIA로 접근성 확보.

## Design System

### 컬러 팔레트

| 구분  | 컬러명        | HEX             | 용도         |
| ----- | ------------- | --------------- | ------------ |
| Main  | color-main    | `#414141`       | 텍스트, 강조 |
| Point | Sage          | `#a4bc9e`       | 포인트       |
| Point | Sand          | `#e6d7b9`       | 포인트       |
| Line  | Border        | `#eee`          | 구분선       |
| Bg    | Bg Light      | `#f9f9f9`       | 서브 배경    |
| Base  | White / Black | `#fff` / `#000` | 배경, 강조   |
| Error | Error         | `#c45c5c`       | 폼 검증 에러 |

### 타이포그래피

- Font: `$ff-serif`, `$ff-sans` (Cormorant Garamond / Noto Sans KR). 폰트는 `_vars.scss`에만 정의, 스타일은 `var(--serif)` / `var(--sans)` 사용.
- Base: html 62.5%, `$fs-base`(body) — 리셋에서만 사용.
- Weights: 300 / 400
- clamp 5종: `$fs-body`, `$fs-subtitle`, `$fs-title`, `$fs-hero`, `$fs-hero-xl` (본문·섹션소제목·대제목·히어로·이벤트디테일히어로). 나머지는 고정 rem.

| 스타일    | 변수         | 용도                 |
| --------- | ------------ | -------------------- |
| Caption   | $fs-caption  | 캡션, 라벨           |
| Body 소   | $fs-body-sm  | 본문 소, 네비        |
| Body      | $fs-body     | 일반 본문            |
| Body 강조 | $fs-body-lg  | 강조 본문            |
| Subtitle  | $fs-subtitle | 섹션/소제목          |
| Title     | $fs-title    | 페이지/대제목        |
| Display   | $fs-display  | 디스플레이           |
| Hero      | $fs-hero     | 히어로               |
| Hero XL   | $fs-hero-xl  | 이벤트 디테일 히어로 |

### 레이아웃

- Container Max Width: `1200px` ($inner-width)
- Breakpoints(반응형 5단계): Small Mobile `< 480` / Mobile `480~767` / Tablet `768~1023` / Laptop `1024~1279` / Desktop `1280~`
- Mixin: `@include small-mobile`, `@include mobile`, `@include tablet`, `@include laptop`

## Scope & Deliverables

### 페이지 구성

| 페이지                  | 역할         | 주요 섹션                                             |
| ----------------------- | ------------ | ----------------------------------------------------- |
| **index.html**          | Main         | Hero, 스토리·메뉴·가치 소개, CTA                    |
| **about.html**          | Story        | Hero, Brand Story, 스토리 그리드                      |
| **product.html**        | Menu         | 필터(전체/빵/케이크/커피), 메뉴 그리드(JSON 기반)     |
| **product-detail.html** | Menu Detail  | 상품 Hero, 상세 설명, 재료·썸네일 갤러리(동적 렌더링) |
| **event.html**          | Events       | 필터(진행중/예정/과거), 이벤트 그리드(JSON 기반)      |
| **event-detail.html**   | Event Detail | 이벤트 Hero, 상세 텍스트·이미지·메뉴(동적 렌더링)     |
| **location.html**       | Location     | 오시는 길, 지도 연동(map.js), 문의 폼                 |

### 콘텐츠·데이터 범위

- **메뉴 카테고리**: 전체 / 빵(bread) / 케이크(cake) / 커피(coffee). `src/data/products.json` 기준 동적 필터·상세 렌더링.
- **이벤트 카테고리**: 진행중(ongoing) / 예정(upcoming) / 과거(past). `src/data/events.json` 기준 필터·상세 렌더링.

## Tech & Implementation

### HTML / SCSS / JS 방향

- **HTML**: 시맨틱 태그 우선, 불필요한 래퍼 div 지양, alt·aria-label·aria-expanded 등 접근성 필수.
- **SCSS**: base / layout / components / pages 모듈화, BEM 1단계 depth(블록\_\_요소만), 변수·Mixin으로 중복 최소화, 미디어 쿼리 `@include small-mobile`, `mobile`, `tablet`, `laptop`, 속성 순서(레이아웃 → 박스모델 → 시각효과 → 기타).
- **JS**: Vanilla, IIFE. 네비 토글·reveal(스크롤 노출), products/events 필터·렌더, location 지도(map.js) 페이지별 모듈 분리.

### 퍼블리싱 포인트

- **Responsive**: 반응형 5단계(Small Mobile &lt;480 / Mobile 480~767 / Tablet 768~1023 / Laptop 1024~1279 / Desktop 1280~), @include small-mobile, mobile, tablet, laptop.
- **Key Function**: JSON 기반 메뉴·이벤트 필터·동적 상세 렌더링, 네비 토글 aria-expanded·aria-label, .reveal 스크롤 노출, location 지도 연동.
- **Web Standard**: 시맨틱 태그 활용, ARIA 속성·alt 필수, Chrome/Firefox/Safari/Edge 최신 버전 대상.

### 주요 인터랙션

- 스크롤 리빌: .reveal 요소 viewport 진입 시 .active 추가, 노출 애니메이션.
- 메뉴 필터: 전체/빵/케이크/커피, data-filter 기반, 페이드 전환.
- 이벤트 필터: 진행중/예정/과거, data-category 기반, 페이드 전환.
- 네비 토글: nav.active, setAria(open)로 aria-expanded·aria-label 동적 제어, 외부·링크 클릭 시 자동 닫힘.
- 반응형: max-width 기준 5단계, 브레이크포인트별 최적화.

## File Structure

```
aube/
├── index.html
├── about.html
├── product.html
├── product-detail.html
├── event.html
├── event-detail.html
├── location.html
├── README.md
├── docs/
│   ├── brand-guide.md
│   ├── coding-conventions.md
│   └── accessibility-report.md
├── src/
│   ├── css/
│   │   └── main.css
│   ├── image/
│   │   └── favicon.png
│   ├── scss/
│   │   ├── base/       (_vars, _reset, _mixins)
│   │   ├── layout/     (_header, _footer)
│   │   ├── components/ (_common)
│   │   ├── pages/      (_index, _about, _product, _product-detail, _event, _event-detail, _location)
│   │   └── main.scss
│   ├── js/
│   │   ├── common.js
│   │   ├── map.js
│   │   ├── products/   (filter.js, render.js)
│   │   └── events/     (filter.js, render.js)
│   └── data/
│       ├── products.json
│       └── events.json
```

## Outcome

- **기술**: 시맨틱 마크업·웹 표준 준수, SCSS 모듈·BEM 1단계로 유지보수·가독성 확보, 속성 순서 표준화.
- **디자인**: 비건 베이커리 브랜드 정체성(새벽·순수·미식) 표현, 반응형 5단계로 디바이스 대응.
- **경험**: 직관적 네비게이션, 스크롤 리빌·필터 전환, 접근성(ARIA·alt) 고려.

**© 2026 AUBE. All rights reserved.**  
_(포트폴리오 프로젝트용 가상 브랜드)_
