# 프로젝트 코딩 컨벤션

BEM, 속성 순서, SCSS, HTML 적용 규칙 — 요약 정리.

## BEM 네이밍

| 항목           | 규칙                                                                     |
| -------------- | ------------------------------------------------------------------------ |
| **Depth**      | `블록__요소` 1단계까지만                                                 |
| **예시**       | `nav__logo`, `nav__menu`, `about-hero__title`, `product-card__name`      |
| **추가 depth** | 새 블록으로 분리 또는 공통 유틸 클래스로 처리                            |
| **수식어**     | `--active`, `--open`처럼 `--`로 상태·변형 표현                           |
| **네이밍**     | 추상명 X → `nav-list`, `product-card`, `section-header` 등 직관적 명사형 |
| **일관**       | 같은 패턴·같은 단어로 통일                                               |

## CSS 속성 순서

**순서**: 레이아웃 → 박스모델 → 시각효과 → 기타

| 순서 | 영역     | 대표 속성                                                                  |
| :--: | -------- | -------------------------------------------------------------------------- |
|  1   | 레이아웃 | `display`, `position`, `inset`, `flex-*`, `grid-*`, `align-*`, `justify-*` |
|  2   | 박스모델 | `width`, `height`, `margin`, `padding`, `box-sizing`, `overflow`           |
|  3   | 시각효과 | `color`, `background`, `border`, `box-shadow`, `opacity`, `filter`         |
|  4   | 기타     | `font-*`, `text-*`, `cursor`, `transition`, `animation`, `transform`       |

- 동일 역할 속성: 셀렉터 쉼표로 그룹화, 한 블록 내 선언.

## 금지 사항

> **!important 금지** — 우선 적용은 셀렉터·명시도로만 조절.

- **주석 금지**: 코드 내 설명·구분용 주석 작성하지 않음. 코드 자체로 가독성 확보.
- **인라인 스타일**: HTML `style=""` 금지. 색·크기·배경은 SCSS 클래스만 사용.
- **충돌 시**: BEM 수식어 또는 셀렉터 범위 조정으로 해결.

## SCSS 변수·Mixin

### 변수 (`_vars.scss`에만 정의)

- **컬러**: `$clr-main`, `$clr-point-sage`, `$clr-point-sand`, `$white`, `$black`, `$clr-border`, `$clr-bg-light`, `$clr-error`
- **타이포**: `$ff-serif`, `$ff-sans`, `$fs-base`, `$fs-caption` ~ `$fs-hero-xl` (clamp 5종: body, subtitle, title, hero, hero-xl / 나머지 고정)
- **행간**: `$lh-base`, `$lh-mobile`
- **간격·브레이크**: `$sp-xs` ~ `$sp-7xl`, `$small-mobile`, `$mobile`, `$tablet`, `$laptop`, `$inner-width`, `$page-padding`
- **트랜지션**: `$transition-base` (0.3s ease-out)
- **원칙**: 재사용 가능한 값은 변수 정의. 단 1곳 사용 특수값은 직접 기입 허용

### Mixin (반응형 5단계)

- **미디어 쿼리**: `@include small-mobile`(&lt;480), `@include mobile`(&lt;768), `@include tablet`(&lt;1024), `@include laptop`(&lt;1280). 1280~ = Desktop(기본). max-width 기준
- **기타**: `@mixin body-text`, `@mixin filter-btn-base` 등 2회 이상 쓰는 패턴만 Mixin으로 분리

### 모듈화 구조

```
scss/
├── base/        → 전역 변수, Mixin, 리셋 (_vars, _mixins, _reset)
├── layout/      → 공통 헤더·푸터
├── components/  → 공통 UI (_common)
├── pages/       → 페이지별 스타일 (_index, _about, _product, _product-detail, _event, _event-detail, _location)
└── main.scss
```

## HTML

- **구조**: `header`, `main`, `section`, `article`, `footer`, `nav` 시맨틱 태그 우선
- **래퍼**: 불필요한 래퍼 div 지양. 넓이 제한은 `.container`(max-width: $inner-width) 등으로 처리
- **클래스·id·data**: **kebab-case**(소문자+하이픈) 통일. 예: `nav__toggle`, `about-hero__title`, `data-filter="bread"`, `data-category="ongoing"`
- **스크롤 노출**: `.reveal` 클래스 부여 시 viewport 진입 시 `.active` 추가·노출 애니메이션(common.js)
