// ============================================================
// MinM Stock Intelligence — 시장 데이터 서비스
// Gemini AI Search Grounding 기반 실시간 지수 수집
// ============================================================

import { GoogleGenAI } from '@google/genai';
import { MarketData, HistoricalDataPoint } from '../types';

const getApiKey = (): string =>
  process.env.GEMINI_API_KEY || process.env.API_KEY || '';

// ── Fallback 시장 데이터 (API 오류 시 사용) ───────────────
export function getFallbackMarketData(): MarketData {
  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  return {
    timestamp: now,
    indices: [
      { id: 'kospi', name: 'KOSPI', symbol: '^KS11', value: '2,564.38', change: '+12.41', changePercent: '+0.49%', direction: 'up', category: 'domestic' },
      { id: 'kosdaq', name: 'KOSDAQ', symbol: '^KQ11', value: '738.24', change: '-3.12', changePercent: '-0.42%', direction: 'down', category: 'domestic' },
      { id: 'kospi200', name: 'KOSPI 200', value: '338.92', change: '+1.87', changePercent: '+0.55%', direction: 'up', category: 'domestic' },
    ],
    globalIndices: [
      { id: 'sp500', name: 'S&P 500', symbol: '^GSPC', value: '5,547.23', change: '+18.34', changePercent: '+0.33%', direction: 'up', category: 'global' },
      { id: 'nasdaq', name: 'NASDAQ', symbol: '^IXIC', value: '17,823.04', change: '-45.67', changePercent: '-0.26%', direction: 'down', category: 'global' },
      { id: 'dow', name: 'Dow Jones', symbol: '^DJI', value: '39,247.85', change: '+124.53', changePercent: '+0.32%', direction: 'up', category: 'global' },
      { id: 'nikkei', name: 'Nikkei 225', symbol: '^N225', value: '38,014.67', change: '+287.34', changePercent: '+0.76%', direction: 'up', category: 'global' },
      { id: 'shanghai', name: 'Shanghai', symbol: '000001.SS', value: '2,947.13', change: '-15.42', changePercent: '-0.52%', direction: 'down', category: 'global' },
    ],
    macroIndicators: [
      { id: 'usdkrw', name: 'USD/KRW', value: '1,372.50', change: '-4.30', changePercent: '-0.31%', direction: 'down', category: 'macro', unit: '원', description: '달러/원 환율' },
      { id: 'us10y', name: '미 10년물', value: '4.284', change: '+0.032', changePercent: '+0.75%', direction: 'up', category: 'macro', unit: '%', description: '미국 10년 국채 금리' },
      { id: 'vix', name: 'VIX', value: '18.42', change: '-1.23', changePercent: '-6.26%', direction: 'down', category: 'macro', description: '시장 공포 지수' },
      { id: 'feargreed', name: 'Fear & Greed', value: '62', change: '+3', changePercent: '', direction: 'up', category: 'macro', description: '탐욕 구간 (0=극도 공포 / 100=극도 탐욕)' },
      { id: 'gold', name: 'Gold', value: '2,382.40', change: '+12.80', changePercent: '+0.54%', direction: 'up', category: 'macro', unit: 'USD', description: '금 선물 온스당 가격' },
      { id: 'wti', name: 'WTI 원유', value: '78.34', change: '-0.87', changePercent: '-1.10%', direction: 'down', category: 'macro', unit: 'USD', description: 'WTI 원유 배럴당 가격' },
    ],
    supply: [
      { investor: '외국인', kospi: '+3,421', kosdaq: '-782', direction: 'up' },
      { investor: '기관', kospi: '+1,284', kosdaq: '+234', direction: 'up' },
      { investor: '개인', kospi: '-4,705', kosdaq: '+548', direction: 'down' },
    ],
    strongThemes: [
      { theme: 'AI반도체', leadingStock: '삼성전자', changePercent: '+2.34%', reason: 'HBM 수요 급증 기대', direction: 'up' },
      { theme: '방산', leadingStock: 'LIG넥스원', changePercent: '+4.12%', reason: '글로벌 지정학 리스크 확대', direction: 'up' },
      { theme: '2차전지', leadingStock: 'LG에너지솔루션', changePercent: '+1.87%', reason: '미국 IRA 추가 수혜 기대', direction: 'up' },
    ],
    weakThemes: [
      { theme: '건설', leadingStock: 'GS건설', changePercent: '-2.14%', reason: '부동산 PF 우려 지속', direction: 'down' },
      { theme: '화학', leadingStock: 'LG화학', changePercent: '-1.67%', reason: '중국 덤핑 우려 지속', direction: 'down' },
    ],
    historicalData: getFallbackHistoricalData(),
    tossApiStatus: {
      docUrl: 'https://developers.tossinvest.com/docs',
      lastSynced: now,
      isConnected: false,
    },
  };
}

// ── Fallback 히스토리컬 데이터 (7거래일) ─────────────────
export function getFallbackHistoricalData(): HistoricalDataPoint[] {
  return [
    { date: '07/28', kospi: 2521.3, kosdaq: 731.4, sp500: 5484.2, nasdaq: 17599.1, usdkrw: 1381.2 },
    { date: '07/29', kospi: 2534.7, kosdaq: 735.8, sp500: 5510.8, nasdaq: 17678.3, usdkrw: 1378.5 },
    { date: '07/30', kospi: 2548.2, kosdaq: 730.1, sp500: 5496.3, nasdaq: 17643.7, usdkrw: 1375.9 },
    { date: '07/31', kospi: 2541.6, kosdaq: 728.9, sp500: 5521.4, nasdaq: 17701.2, usdkrw: 1379.3 },
    { date: '08/01', kospi: 2556.3, kosdaq: 741.2, sp500: 5535.9, nasdaq: 17756.8, usdkrw: 1374.1 },
    { date: '08/04', kospi: 2549.8, kosdaq: 736.4, sp500: 5528.2, nasdaq: 17810.4, usdkrw: 1376.8 },
    { date: '08/05', kospi: 2564.4, kosdaq: 738.2, sp500: 5547.2, nasdaq: 17823.0, usdkrw: 1372.5 },
  ];
}

// ── Gemini AI Search Grounding 실시간 시장 데이터 수집 ────
export async function fetchMarketData(): Promise<MarketData> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('[MarketDataService] API Key 없음 — Fallback 데이터 사용');
    return getFallbackMarketData();
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
오늘 날짜 기준 최신 금융 시장 데이터를 JSON 형식으로 정확히 반환하세요.
응답은 반드시 JSON만, 마크다운 코드블록 없이 반환하세요.

{
  "kospi": "값",
  "kospi_change": "+/-값",
  "kospi_pct": "+/-값%",
  "kosdaq": "값",
  "kosdaq_change": "+/-값",
  "kosdaq_pct": "+/-값%",
  "sp500": "값",
  "sp500_change": "+/-값",
  "sp500_pct": "+/-값%",
  "nasdaq": "값",
  "nasdaq_change": "+/-값",
  "nasdaq_pct": "+/-값%",
  "nikkei": "값",
  "nikkei_change": "+/-값",
  "nikkei_pct": "+/-값%",
  "usdkrw": "값",
  "usdkrw_change": "+/-값",
  "usdkrw_pct": "+/-값%",
  "us10y": "값",
  "us10y_change": "+/-값",
  "vix": "값",
  "vix_change": "+/-값",
  "gold": "값",
  "gold_change": "+/-값",
  "gold_pct": "+/-값%",
  "wti": "값",
  "wti_change": "+/-값",
  "wti_pct": "+/-값%",
  "foreign_kospi": "+/-값억",
  "institution_kospi": "+/-값억",
  "strong_theme_1": "테마명|대표종목|등락률|이유",
  "strong_theme_2": "테마명|대표종목|등락률|이유",
  "weak_theme_1": "테마명|대표종목|등락률|이유"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = (response.text || '').trim()
      .replace(/^```json\s*/i, '').replace(/\s*```$/, '')
      .replace(/^```\s*/, '').replace(/\s*```$/, '');

    const raw = JSON.parse(text);
    return buildMarketDataFromRaw(raw);
  } catch (err) {
    console.warn('[MarketDataService] 실시간 수집 실패 — Fallback 사용:', err);
    return getFallbackMarketData();
  }
}

// ── Raw JSON → MarketData 구조체 변환 ────────────────────
function buildMarketDataFromRaw(raw: Record<string, string>): MarketData {
  const direction = (pct: string) =>
    pct.startsWith('+') ? 'up' : pct.startsWith('-') ? 'down' : 'neutral';

  const fallback = getFallbackMarketData();
  const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  const parseTheme = (raw: string) => {
    const parts = (raw || '').split('|');
    return {
      theme: parts[0] || '—', leadingStock: parts[1] || '—',
      changePercent: parts[2] || '0%', reason: parts[3] || '—',
      direction: direction(parts[2] || ''),
    };
  };

  return {
    timestamp: now,
    indices: [
      { id: 'kospi', name: 'KOSPI', value: raw.kospi || fallback.indices[0].value, change: raw.kospi_change || '', changePercent: raw.kospi_pct || '', direction: direction(raw.kospi_pct || ''), category: 'domestic' },
      { id: 'kosdaq', name: 'KOSDAQ', value: raw.kosdaq || fallback.indices[1].value, change: raw.kosdaq_change || '', changePercent: raw.kosdaq_pct || '', direction: direction(raw.kosdaq_pct || ''), category: 'domestic' },
    ],
    globalIndices: [
      { id: 'sp500', name: 'S&P 500', value: raw.sp500 || fallback.globalIndices[0].value, change: raw.sp500_change || '', changePercent: raw.sp500_pct || '', direction: direction(raw.sp500_pct || ''), category: 'global' },
      { id: 'nasdaq', name: 'NASDAQ', value: raw.nasdaq || fallback.globalIndices[1].value, change: raw.nasdaq_change || '', changePercent: raw.nasdaq_pct || '', direction: direction(raw.nasdaq_pct || ''), category: 'global' },
      { id: 'nikkei', name: 'Nikkei 225', value: raw.nikkei || fallback.globalIndices[3].value, change: raw.nikkei_change || '', changePercent: raw.nikkei_pct || '', direction: direction(raw.nikkei_pct || ''), category: 'global' },
    ],
    macroIndicators: [
      { id: 'usdkrw', name: 'USD/KRW', value: raw.usdkrw || '', change: raw.usdkrw_change || '', changePercent: raw.usdkrw_pct || '', direction: direction(raw.usdkrw_pct || ''), category: 'macro', unit: '원' },
      { id: 'us10y', name: '미 10년물', value: raw.us10y || '', change: raw.us10y_change || '', changePercent: '', direction: direction(raw.us10y_change || ''), category: 'macro', unit: '%' },
      { id: 'vix', name: 'VIX', value: raw.vix || '', change: raw.vix_change || '', changePercent: '', direction: direction(raw.vix_change || ''), category: 'macro' },
      { id: 'gold', name: 'Gold', value: raw.gold || '', change: raw.gold_change || '', changePercent: raw.gold_pct || '', direction: direction(raw.gold_pct || ''), category: 'macro', unit: 'USD' },
      { id: 'wti', name: 'WTI 원유', value: raw.wti || '', change: raw.wti_change || '', changePercent: raw.wti_pct || '', direction: direction(raw.wti_pct || ''), category: 'macro', unit: 'USD' },
    ],
    supply: [
      { investor: '외국인', kospi: raw.foreign_kospi || '', kosdaq: '—', direction: direction(raw.foreign_kospi || '') },
      { investor: '기관', kospi: raw.institution_kospi || '', kosdaq: '—', direction: direction(raw.institution_kospi || '') },
    ],
    strongThemes: [
      parseTheme(raw.strong_theme_1 || ''),
      parseTheme(raw.strong_theme_2 || ''),
    ],
    weakThemes: [
      parseTheme(raw.weak_theme_1 || ''),
    ],
    historicalData: fallback.historicalData,
    tossApiStatus: {
      docUrl: 'https://developers.tossinvest.com/docs',
      lastSynced: now,
      isConnected: true,
    },
  } as MarketData;
}
