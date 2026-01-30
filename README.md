<div align="center">

# AUBE (오브)

### 비건 베이커리 브랜드 웹사이트 · **Portfolio Project**

**새벽의 고요함이 빚어낸 미식의 순간 · The Ethics of Taste**

[Brand Guide](./docs/brand-guide.md) · [Live View](https://kimgsun.github.io/aube/)

</div>

---

## 📌 프로젝트 소개

비건 베이커리 브랜드 **AUBE(오브)** 컨셉의 웹사이트 **포트폴리오 프로젝트**입니다. 기획 100%, 디자인 100%, 퍼블리싱 100% (1인 작업).

동물성 재료 없이 빵·케이크·음료를 빚고, 새벽의 고요함이 빚어낸 미식의 순간을 전달하는 오브의 철학을 시맨틱 마크업과 BEM·SCSS로 구현했습니다.

<br/>

## ✨ 주요 기능

- 🧭 **네비게이션** - 모바일 토글 메뉴, aria-expanded·aria-label 접근성
- ✨ **스크롤 리빌** - .reveal 요소 스크롤 시 노출 애니메이션
- 🔍 **메뉴 필터** - product.html 카테고리별 동적 필터(전체/빵/케이크/커피), 페이드 전환
- 📅 **이벤트 필터** - event.html 진행중/예정/과거 필터, 이벤트·상세 페이지 동적 렌더링
- 📍 **지도** - location.html 지도 연동 (map.js)
- 📱 **완전 반응형** - 반응형 5단계, @include small-mobile/mobile/tablet/laptop mixin 사용
- ♿ **웹 접근성** - ARIA 속성, 시맨틱 마크업 준수

<br/>

## 🛠️ 기술 스택

### Frontend

<div>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5"/>
  <img src="https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</div>

### Design & Tools

<div>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma"/>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/>
  <img src="https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Pages"/>
</div>

<br/>

## 📂 프로젝트 구조

```
aube/
├── index.html                   # 메인 페이지
├── about.html                   # 스토리 소개
├── product.html                 # 메뉴 목록
├── product-detail.html          # 메뉴 상세
├── event.html                   # 이벤트 목록
├── event-detail.html            # 이벤트 상세
├── location.html                # 오시는 길
├── README.md
├── docs/
│   ├── brand-guide.md           # 기획·디자인 가이드
│   ├── coding-conventions.md    # 코딩 컨벤션
│   └── accessibility-report.md  # 접근성 리포트
│
├── src/
│   ├── css/
│   │   └── main.css             # 컴파일된 CSS
│   ├── image/
│   │   └── favicon.png          # 파비콘
│   │
│   ├── scss/
│   │   ├── base/                # Vars, Mixins, Reset
│   │   ├── layout/              # Header, Footer
│   │   ├── components/          # Common
│   │   ├── pages/               # 페이지별 스타일
│   │   └── main.scss            # Entry point
│   │
│   ├── js/
│   │   ├── common.js            # 네비 토글, reveal, initFilter(필터 공통)
│   │   ├── map.js               # location 지도
│   │   ├── products/            # filter, render
│   │   └── events/              # filter, render
│   │
│   └── data/
│       ├── products.json        # 메뉴 데이터
│       └── events.json          # 이벤트 데이터
```

<br/>

## 📐 퍼블리싱 포인트

| 항목             | 내용                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Responsive**   | 반응형 5단계: Small Mobile(<480)·Mobile(480~767)·Tablet(768~1023)·Laptop(1024~1279)·Desktop(1280~) @include small-mobile, mobile, tablet, laptop |
| **Key Function** | JSON 기반 메뉴·이벤트 필터·동적 상세 렌더링, 네비 토글 aria-expanded·aria-label, .reveal 스크롤 노출, location 지도 연동                         |
| **Web Standard** | 시맨틱 태그, ARIA·alt 필수, Chrome/Firefox/Safari/Edge 최신 버전 대상                                                                            |

<br/>

## 🎯 핵심 기능 상세

### 1️⃣ 메뉴 필터 (product.html)

```javascript
// 카테고리별 동적 필터링
- 전체 / 빵 / 케이크 / 커피
- Fade 전환, data-filter·filtering 클래스
- JSON 데이터 기반 렌더링 (products/render.js, initFilter)
```

### 2️⃣ 이벤트 필터 (event.html)

```javascript
// data-category 기반 필터 (진행중/예정/과거)
- Fade 전환, 이벤트 상세 동적 렌더링 (events/render.js)
```

### 3️⃣ 네비게이션 토글 (common.js)

```javascript
// nav.active 토글, setAria(open)으로 aria-expanded·aria-label 제어
- 토글 버튼 클릭 시 메뉴 열림/닫힘, 외부·링크 클릭 시 자동 닫힘
- .nav.active로 패널 표시
```

### 4️⃣ 스크롤 리빌 (common.js)

```javascript
// .reveal 요소 스크롤 감지, viewport 진입 시 .active 추가
- window.runRevealCheck()로 동적 요소 반영
```

```html
<section class="reveal">
  <!-- 스크롤 시 viewport 진입 후 노출 애니메이션 -->
</section>
```

### 5️⃣ 지도 (location.html, map.js)

```javascript
// Leaflet 기반 초기화·마커, 문의 폼 submit 시 alert
```

**지도 좌표 수정:** `src/js/map.js`의 `lat`, `lng` 값을 실제 매장 위치로 바꾸면 됩니다.  
좌표 확인: **네이버/카카오 지도** 주소 검색 → 위치 **우클릭 → 좌표 복사**, 또는 **Google 지도** 위치 우클릭 → "이곳이 궁금한가요?"에서 위·경도 확인.

<br/>

## 🎨 디자인 시스템

### 컬러 팔레트

```scss
$white: #fff; // 배경
$black: #000; // 강조
$clr-main: #414141; // 텍스트
$clr-point-sage: #a4bc9e; // 포인트
$clr-point-sand: #e6d7b9; // 포인트
$clr-border: #eee; // 구분선
$clr-bg-light: #f9f9f9; // 서브 배경
$clr-error: #c45c5c; // 폼 에러
```

### 타이포그래피

```scss
$ff-serif: "Cormorant Garamond", serif; // serif
$ff-sans: "Noto Sans KR", sans-serif; // body (weights 300 / 400)

$fs-caption: 0.8rem; // 캡션, 라벨
$fs-body-sm: 1rem; // 본문 소, 네비
$fs-body: clamp(1.4rem, 1.2rem + 0.5vw, 1.6rem); // 본문
$fs-body-lg: 1.75rem; // 본문 강조
$fs-subtitle: clamp(1.8rem, 1.4rem + 1vw, 2.6rem); // 섹션 소제목
$fs-title: clamp(2.6rem, 2rem + 1.2vw, 4rem); // 페이지 대제목
$fs-display: 3.6rem; // 디스플레이
$fs-hero: clamp(4rem, 2.5rem + 5vw, 9.6rem); // 히어로
$fs-hero-xl: clamp(4.2rem, 2.5rem + 6vw, 12.8rem); // 이벤트 디테일 히어로
```

### 반응형 브레이크포인트

```scss
$small-mobile: 480px; // @include small-mobile (<480)
$mobile: 768px; // @include mobile (<768)
$tablet: 1024px; // @include tablet (<1024)
$laptop: 1280px; // @include laptop (<1280). 1280~ = Desktop(기본)
```

<br/>

## 📊 프로젝트 데이터 구조

`src/data/products.json` 수정 예시:

```json
{
  "id": "classic-sourdough",
  "name": "Classic Sourdough",
  "category": "bread",
  "label": "Slow Fermentation",
  "description": "72시간의 기다림 끝에 완성되는 시그니처 사워도우.",
  "price": 8500,
  "image": "https://...",
  "layout": "main",
  "detailDescription": "상세 설명 텍스트",
  "ingredients": "유기농 밀가루, 천연 발효종, 호밀, 정제염, 물.",
  "thumbnailImages": ["url1", "url2"]
}
```

`src/data/events.json` 수정 예시:

```json
{
  "id": "strawberry-pure-essence",
  "title": "Pure Strawberry\nHarvest.",
  "category": "ongoing",
  "season": "Spring 2026",
  "description": "설탕 없이 딸기 본연의 당도로 빚은 봄 미식.",
  "period": "01.15 — 04.30",
  "image": "https://...",
  "detailLabel": "Seasonal Event 2026",
  "detailTitle": "가장 붉게 익은 계절의 조각",
  "detailIntro": "이번 봄 테마 소개.",
  "detailText": "상세 텍스트.",
  "detailImages": ["url1", "url2"],
  "menu": [{ "name": "Pure Strawberry Vegan Ice-cream", "price": 9500 }],
  "duration": "January 15 — April 30",
  "location": "AUBE Seongsu Atelier",
  "ctaLabel": "Share the Moment",
  "ctaTitle": "Invitation to\nSpring Dawn."
}
```

<br/>

## 📱 반응형 지원 (5단계)

| Device       | Breakpoint      |
| ------------ | --------------- |
| Small Mobile | < 480px         |
| Mobile       | 480px ~ 767px   |
| Tablet       | 768px ~ 1023px  |
| Laptop       | 1024px ~ 1279px |
| Desktop      | 1280px ~        |

<br/>

## 🌐 브라우저 지원

|  Chrome   |  Firefox  |  Safari   |   Edge    |
| :-------: | :-------: | :-------: | :-------: |
| ✅ Latest | ✅ Latest | ✅ Latest | ✅ Latest |

<br/>

## 📋 코딩 컨벤션

### HTML

- 시맨틱 태그 우선 (header, main, section, article, footer)
- 불필요한 래퍼 div 사용 지양
- 웹 접근성 속성 필수 (alt, aria-label, aria-expanded)
- 인라인 스타일 금지

### SCSS

- BEM 1단계 depth 엄격 준수 (`블록__요소` 형태만)
- 속성 순서: **레이아웃 → 박스모델 → 시각효과 → 기타**
- `!important` 절대 금지, 명시도로만 제어
- Mixin: 2회 이상 사용 패턴만 정의
- 재사용 가능한 값은 변수화, 특수값은 직접 기입 허용

### JavaScript

- Vanilla JS, IIFE 패턴
- 간결한 변수명 (실무 중심)
- 에러는 alert로만 표시

<br/>

## 🔗 Live View / Repository

| 구분           | 링크                            |
| -------------- | ------------------------------- |
| **Live View**  | https://kimgsun.github.io/aube/ |
| **Repository** | https://github.com/kimgsun/aube |

<br/>

## 📄 라이선스

© 2026 **AUBE**. All rights reserved.

---

<br/>

<div align="center">

**Planning · Design · Publishing 100%** (Portfolio)

Built with HTML5, SCSS, JavaScript

</div>
