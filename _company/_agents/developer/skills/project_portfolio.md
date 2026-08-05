# 💻 코다리 전용 — MinM AI 프로젝트 포트폴리오 기술 명세서

_이 스킬은 코다리의 system prompt에 자동 주입됩니다. 모든 프로젝트의 기술 아키텍처를 숙지하고 개발/유지보수에 즉시 투입되어라._

---

## ⚡ 공통 기술 기반 (All Projects Share)

- **공통 Frontend Stack**: React 19, TypeScript ~5.8, Vite 6 (Port 3000, `@/` 경로 별칭)
- **공통 AI SDK**: `@google/genai` — Gemini API 전 모델 사용
- **공통 스타일링**: Tailwind CSS (CDN 또는 PostCSS)
- **공통 환경변수**: `GEMINI_API_KEY` → `.env.local` + `vite.config.ts`에 `process.env` 매핑

---

## 📂 8대 프로젝트 기술 상세

### 1. 🧠 Insight Flow (인사이트 플로우)
- **콘셉트**: 레이 달리오 부채 사이클 & 찰리 멍거 다학제적 사고 모델 기반 거시경제 CIO 플랫폼
- **Tech**: React + TypeScript + Vite (순수 Frontend, `gemini-3.6-flash`)
- **핵심 파일**:
  - `types.ts` → `AnalysisResult`, `GroundingSource`, `AlphaVerdict`, `PrismAnalysis`
  - `geminiService.ts` → `performInsightAnalysis()`, `runRedTeamChat()`, `withRetry()`, `normalizeAnalysisResult()`
  - `App.tsx` → Strategic Verdict, Prism Analysis, Red Team Chat UI
- **폴백 패턴**: Search Grounding 실패 → `gemini-3.6-flash` 순수 지식 폴백 자동 전환
- **알파 판정**: `ALPHA_EXPANSION | RISK_MITIGATION | STRATEGIC_PATIENCE | LIQUIDITY_PRESERVATION`

### 2. 💡 지식 암기 전문가
- **콘셉트**: 뇌과학 기반 암기 보조 — 비유/원리/마인드맵/TTS/OCR/모바일
- **Tech**: React + TypeScript + Vite + **Express 풀스택** + **Capacitor 8 Android**
- **핵심 파일**:
  - `server.ts` → Express 서버 + Vite 미들웨어 (포트 3000), API 키 보안 격리
  - `services/serverGemini.ts` → 백엔드 Gemini SDK (`gemini-3.5-flash` 분석 + `gemini-2.5-flash-image` 이미지)
  - `services/ttsService.ts` → Web Speech API
  - `services/cacheService.ts` → LocalStorage 캐싱
  - `components/MindMap.tsx` → 연관 개념 노드 마인드맵
- **API**: `POST /api/analyze-keyword`, `POST /api/analyze-image` (OCR)
- **빌드**: `npm run dev` (tsx server.ts) / `npm run build` (vite + esbuild CJS bundle)

### 3. 📈 MinM AI 토스 터미널
- **콘셉트**: 토스증권 Open API 표준 지수 & Gemini 스트리밍 퀀트 리포트
- **Tech**: React 19 + TypeScript + Vite + `recharts` (2.15.0)
- **핵심 파일**:
  - `components/TossIndexTerminal.tsx` → KOSPI/KOSDAQ/S&P500/VIX/수급 탭 터미널
  - `components/MarketTrendChart.tsx` → 7거래일 Recharts 다중 차트
  - `services/marketDataService.ts` → Google Search Grounding 데이터 파이프라인 + Fallback
  - `services/geminiService.ts` → 스트리밍 퀀트 리포트 (Pro/Basic 등급 분기)
  - `App.tsx` → `useCallback` + `useRef` 무한 재렌더링 방지 최적화
- **데이터 모델**: `MarketData`, `IndexData`, `ReportType`, `UserProfile`, `UserTier`

### 4. 🎴 AI Card News Maker
- **콘셉트**: 주제 → Gemini 2.5 Flash 카드시리즈 생성 → Imagen 4.0 이미지 → PNG ZIP 내보내기
- **Tech**: React + TypeScript + Vite + `@google/genai` + `html2canvas` + `JSZip`
- **핵심 파일**:
  - `services/geminiService.ts` → `generateCardContent()`, `generateImageKeywords()`, `generateImageWithGemini()`
  - `services/imageService.ts` → Pexels/Pixabay/Unsplash API 검색 + Key 핑 테스트
  - `components/CardPreview.tsx` → `fitText()` 자동 폰트 조절 + `saveAllCardsAsZip()` + `saveAsHtml()`
  - `hooks/useLocalStorage.ts` → API 키 저장 훅
- **AI 모델**: `gemini-2.5-flash` (텍스트/키워드) + `imagen-4.0-generate-001` (이미지 생성)
- **Enum**: `AppStep`, `CardStyle`, `AspectRatio`, `ScrollDirection`

### 5. 🏠 AI 인테리어 디자이너
- **콘셉트**: 공간 사진 → Gemini 3 Flash Bounding Box 분석 → Gemini 2.5 Flash Image 3D 렌더링
- **Tech**: React 19 + TypeScript + Vite + `heic2any` (아이폰 HEIC 변환)
- **핵심 파일**:
  - `services/geminiService.ts` → `analyzeRoom()` (gemini-3-flash-preview, JSON Schema) + `redesignRoom()` (gemini-2.5-flash-image, IMAGE+TEXT Modality)
  - `hooks/useImageProcessor.ts` → HEIC → JPEG 변환 + Canvas API 1024px 리사이징
  - `hooks/useGeminiAnalysis.ts` / `useGeminiRedesign.ts` → 비동기 상태 분리
  - `components/ImageAnalysisOverlay.tsx` → Bounding Box 오버레이 렌더링
  - `components/ImageComparator.tsx` → 원본 vs 결과 비교 슬라이더
- **타입**: `RoomAnalysis`, `BoundingBox`, `RedesignResult`, `HistoryItem`, `DesignMode`

### 6. 📱 SnapTerminal (스냅터미널)
- **콘셉트**: Bloomberg 터미널 스타일 안드로이드 네이티브 금융 분석 앱
- **Tech**: **Kotlin + Jetpack Compose (Material3)** + MVVM + Room DB + Retrofit2 + Moshi
- **패키지**: `com.aistudio.snapterminal.finance`
- **핵심 파일**:
  - `TerminalRepository.kt` → Yahoo Finance REST + Gemini REST API (`gemini-1.5-flash`) 직접 HTTP POST
  - `FinancialCanvasChart.kt` → Compose Canvas 캔들스틱/MA20,50/볼린저밴드/Crosshair
  - `TechnicalAnalysis.kt` → RSI 14일선 + MACD 오실레이터 Canvas
  - `TerminalViewModel.kt` → `StateFlow` + `SupervisorScope` 병렬 네트워크 + Gemini 프롬프팅
  - `TerminalDatabase.kt` → Room DB DAO (관심종목 CRUD)
- **빌드**: `gradle assembleDebug`

### 7. ✂️ AI Beauty Salon Marketing Feed
- **콘셉트**: 미용실 마케팅용 헤어/염색 Midjourney/SD 프롬프트 모바일 소셜 피드
- **Tech**: React 19 + TypeScript + Vite + Tailwind CSS (Mobile-first `max-w-lg mx-auto`)
- **핵심 파일**:
  - `components/Post.tsx` → 수평 스크롤 가상 헤어 갤러리 (`overflow-x-auto snap-x`)
  - `components/PromptPost.tsx` → 프롬프트 피드 카드 (1-7번 헤어/염색 추천)
  - `types.ts` → `PromptPostData` 인터페이스

### 8. 📑 유튜버 세금 비서
- **콘셉트**: 1인 미디어 창작자 세무 진단/계산/챗봇/PDF 지식 갱신 솔루션
- **Tech**: React 19 + TypeScript + Vite + `@google/genai` (v1.22.0) + **PDF.js** (CDN)
- **핵심 파일**:
  - `components/TaxChatbot.tsx` → Gemini API 세무 챗봇
  - `components/TaxAdvisor.tsx` → 과세/면세 사업자 + 청년창업 50~100% 감면 진단
  - `components/TaxCalculator.tsx` → 종합소득세 & 부가가치세 시뮬레이터
  - `components/DataUpdater.tsx` → PDF.js 개정 세법 문서 지식 베이스 동적 갱신
  - `constants/taxGuide.ts` → 국세청 유튜버 세무 지식 전문 텍스트

---

## 🔑 개발 시 반드시 지켜야 할 패턴

1. **API Key 보안**: 클라이언트 노출 금지. Express 백엔드 있는 프로젝트는 반드시 `server.ts`에서 처리
2. **JSON 파싱 안전화**: Gemini 응답은 항상 `normalizeAnalysisResult()` 또는 try-catch + fallback 기본값 처리
3. **재시도 패턴**: `withRetry(fn, maxRetries=2, baseDelay=1000)` — Search Grounding 오류는 즉시 폴백 분기
4. **이미지 출력**: Gemini Image API 결과는 Base64 Inline Data URL로 변환하여 프론트엔드에 전달
