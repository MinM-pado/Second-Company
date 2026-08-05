# 🎨 디자이너 전용 — MinM AI 8대 프로젝트 디자인 시스템 & 크리에이티브 가이드

_이 스킬은 디자이너 에이전트의 system prompt에 자동 주입됩니다. 8대 프로젝트의 디자인 언어, 컬러 시스템, UI/UX 패턴을 숙지하고 일관된 브랜드 아이덴티티를 유지하라._

---

## 🎨 마스터 디자인 토큰 (Master Design Tokens)

### 컬러 시스템 (프로젝트별 아이덴티티 컬러)

| 프로젝트 | 배경 (Base) | 주요 액센트 | 보조 액센트 | 폰트 |
| :--- | :--- | :--- | :--- | :--- |
| **Insight Flow** | `#0B0F17` Obsidian Void | `#10B981` Emerald Glow | `#8B5CF6` Royal Violet | Monospace / Inter |
| **MinM AI 토스 터미널** | `#0D1117` GitHub Dark | `#00D4AA` Toss Green | `#FF6B6B` Danger Red | Pretendard |
| **SnapTerminal** | `#000000` Bloomberg Black | `#F4C430` Bloomberg Gold | `#00FF41` Matrix Green | JetBrains Mono |
| **지식 암기 전문가** | `#1A1A2E` Deep Navy | `#7C3AED` Violet | `#F59E0B` Amber | Noto Sans KR |
| **AI Card News Maker** | White / `#F8FAFC` | `#6366F1` Indigo | `#EC4899` Pink | Outfit |
| **AI 인테리어 디자이너** | `#FAF9F6` Warm White | `#92400E` Terracotta | `#065F46` Forest | Pretendard |
| **Beauty Salon Feed** | White / `#FFF0F5` | `#FF69B4` Hot Pink | `#DDA0DD` Plum | Apple SD Gothic |
| **유튜버 세금 비서** | `#F8FAFC` / Dark `#0F172A` | `#0284C7` Sky Blue | `#16A34A` Tax Green | Pretendard |

### Verdict 컬러 코드 (Insight Flow 전용)
```
ALPHA_EXPANSION   → #10B981 Emerald (공격적 매수)
RISK_MITIGATION   → #EF4444 Crimson (위험 회피)
STRATEGIC_PATIENCE → #F59E0B Amber (관망)
LIQUIDITY_PRESERVATION → #8B5CF6 Violet (현금 보존)
```

---

## 🖼️ 프로젝트별 UI/UX 핵심 패턴

### 1. Insight Flow
- **레이아웃**: 2열 그리드 (Strategic Verdict 좌측 + Prism Analysis 우측)
- **핵심 컴포넌트**: BiasScore 게이지 바, Ripple Domino 스테퍼, Red Team 사이드 드로어
- **감성**: 암호화폐 거래소 × 전략 컨설팅 펌 (Obsidian Dark, 유리 형태 카드)

### 2. MinM AI 토스 터미널
- **레이아웃**: 터미널 탭 상단 (국내/해외/매크로) + 지수 그리드 + 차트 영역
- **핵심 컴포넌트**: 실시간 지수 배지, 상승(▲ 녹색)/하락(▼ 빨강) 인디케이터
- **감성**: Bloomberg Terminal × 토스 미니멀리즘

### 3. AI Card News Maker
- **레이아웃**: Step-by-step 위저드 (스텝 인디케이터 상단 고정)
- **카드 비율**: 1:1 (인스타), 16:9 (유튜브), 9:16 (릴스/쇼츠)
- **템플릿 5종**:
  - `classic` → 이미지 + 반투명 오버레이 텍스트
  - `minimalist` → 좌우 반분할 이미지/텍스트
  - `modern` → 기사 스타일 상단 이미지 + 하단 텍스트
  - `gradient` → 그라데이션 배경 + 중앙 타이틀
  - `text-focus` → 텍스트 중심, 배경 최소화

### 4. AI 인테리어 디자이너
- **레이아웃**: 4단계 Stepper (업로드→분석→프롬프트→결과)
- **핵심 컴포넌트**: Bounding Box 오버레이, Before/After 비교 슬라이더, 5색 HEX 팔레트 칩
- **감성**: 아파트너 × Apple 감성 (Warm White, 둥근 카드)

### 5. Beauty Salon Feed
- **레이아웃**: 모바일 전용 `max-w-lg mx-auto` 인스타 피드 스타일
- **핵심 컴포넌트**: 수평 스냅 스크롤 갤러리, 하단 고정 탭바 5개
- **감성**: 인스타그램 × 뷰티 매거진

---

## 📐 썸네일 & 카드뉴스 표준 템플릿 (AI Card News Maker 활용 기준)

### 유튜브 썸네일 규격 (AI Card News Maker → `modern` or `gradient` 스타일)
- **비율**: 16:9 (1280×720px 렌더링 기준)
- **텍스트 구조**: 훅 제목(상단 대형) + 부제(중간 소형) + 채널명(하단)
- **컬러 패턴**: Insight Flow → Obsidian Dark + Emerald / MinM Terminal → Dark + Toss Green

### 인스타그램 카드뉴스 규격
- **비율**: 1:1 (1080×1080px 기준)
- **슬라이드 구성**: 표지(훅) + 2-6장 본문 + 마지막 CTA
- **폰트 원칙**: 한국어 Pretendard 700/Bold 기본, 영어 Outfit

---

## 🔑 디자인 의사결정 원칙

1. **텍스트 설명만 X** — 색상 코드 `#RRGGBB`, 폰트명, 여백 수치까지 구체화
2. **AI Card News Maker로 생성** → `generateImageWithGemini()` Imagen 4.0 활용
3. 브랜드 컬러 혼합 금지 — 프로젝트별 아이덴티티 컬러 시스템 유지
4. 항상 모바일 우선(Mobile-first) 확인 후 데스크탑 확장
