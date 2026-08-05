// ============================================================
// MinM Stock Intelligence — 전역 TypeScript 타입 정의
// ============================================================

export type ReportType = 'pre-market' | 'mid-market' | 'post-market';
export type UserProfile = 'conservative' | 'balanced' | 'aggressive';
export type UserTier = 'basic' | 'pro';
export type IndexCategory = 'domestic' | 'global' | 'macro' | 'crypto';
export type ChangeDirection = 'up' | 'down' | 'neutral';

// ── 지수 데이터 ──────────────────────────────────────────
export interface IndexData {
  id: string;
  name: string;            // 표시 이름 (예: KOSPI)
  symbol?: string;         // 종목 코드 (예: ^KS11)
  value: string;           // 현재 지수 값
  change: string;          // 등락폭 (예: +12.34)
  changePercent: string;   // 등락률 (예: +0.52%)
  direction: ChangeDirection;
  category: IndexCategory;
  unit?: string;           // 단위 (%, 원, USD, bps 등)
  description?: string;    // 지표 설명
}

// ── 투자자 수급 ──────────────────────────────────────────
export interface SupplyData {
  investor: string;        // 외국인 | 기관 | 개인
  kospi: string;           // KOSPI 순매수 (억원)
  kosdaq: string;          // KOSDAQ 순매수 (억원)
  direction: ChangeDirection;
}

// ── 주도 테마 ────────────────────────────────────────────
export interface ThemeData {
  theme: string;           // 테마명 (예: AI반도체)
  leadingStock: string;    // 대표 종목
  changePercent: string;   // 등락률
  reason: string;          // 상승/하락 이유
  direction: ChangeDirection;
}

// ── 히스토리컬 데이터 (차트용) ───────────────────────────
export interface HistoricalDataPoint {
  date: string;            // 날짜 (예: 08/01)
  kospi?: number;
  kosdaq?: number;
  sp500?: number;
  nasdaq?: number;
  usdkrw?: number;
}

// ── 전체 시장 데이터 ─────────────────────────────────────
export interface MarketData {
  timestamp: string;
  indices: IndexData[];               // 국내 지수
  globalIndices: IndexData[];         // 해외 지수
  macroIndicators: IndexData[];       // 매크로 지표
  supply: SupplyData[];               // 투자자 수급
  strongThemes: ThemeData[];          // 강세 테마
  weakThemes: ThemeData[];            // 약세 테마
  historicalData: HistoricalDataPoint[]; // 7거래일 히스토리
  tossApiStatus?: {
    docUrl: string;
    lastSynced: string;
    isConnected: boolean;
  };
}

// ── AI 리포트 ────────────────────────────────────────────
export interface AIReport {
  id: string;
  type: ReportType;
  content: string;
  isStreaming: boolean;
  timestamp: string;
  profile?: UserProfile;
  tier?: UserTier;
}

// ── 관심 종목 ────────────────────────────────────────────
export interface WatchlistItem {
  symbol: string;
  name: string;
  currentPrice: string;
  changePercent: string;
  direction: ChangeDirection;
  addedAt: string;
}

// ── 앱 전역 상태 ─────────────────────────────────────────
export interface AppState {
  marketData: MarketData | null;
  isLoading: boolean;
  error: string | null;
  currentReport: AIReport | null;
  isGeneratingReport: boolean;
  userProfile: UserProfile;
  userTier: UserTier;
  watchlist: WatchlistItem[];
  lastUpdated: string | null;
}
