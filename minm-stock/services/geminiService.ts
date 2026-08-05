// ============================================================
// MinM Stock Intelligence — Gemini AI 퀀트 리포트 생성 서비스
// 스트리밍 방식으로 개장전/장중/장마감 분석 리포트 생성
// ============================================================

import { GoogleGenAI } from '@google/genai';
import { ReportType, UserProfile, UserTier, MarketData } from '../types';

const getApiKey = (): string =>
  process.env.GEMINI_API_KEY || process.env.API_KEY || '';

const REPORT_LABELS: Record<ReportType, string> = {
  'pre-market': '📋 개장전 전략 브리핑',
  'mid-market': '⚡ 장중 실시간 분석',
  'post-market': '📊 장마감 결산 리포트',
};

// ── 퀀트 리포트 스트리밍 생성 ────────────────────────────
export async function generateQuantReport(
  reportType: ReportType,
  marketData: MarketData,
  userProfile: UserProfile,
  userTier: UserTier,
  onChunk: (chunk: string) => void
): Promise<void> {
  const apiKey = getApiKey();
  if (!apiKey) {
    // API 키 없을 때 데모 리포트 생성
    await streamDemoReport(reportType, userProfile, userTier, onChunk);
    return;
  }

  const ai = new GoogleGenAI({ apiKey });

  const profileLabel = {
    conservative: '보수적 (자본 보전 최우선)',
    balanced: '중립적 (균형 수익/리스크)',
    aggressive: '공격적 (고수익 추구)',
  }[userProfile];

  const tierNote = userTier === 'pro'
    ? '⭐ PRO 사용자: 구체적인 비중(%), 진입가, 손절가, 목표가를 포함하세요.'
    : 'BASIC 사용자: 전반적인 방향성과 핵심 인사이트만 제공하세요.';

  const marketSummary = `
- KOSPI: ${marketData.indices[0]?.value} (${marketData.indices[0]?.changePercent})
- KOSDAQ: ${marketData.indices[1]?.value} (${marketData.indices[1]?.changePercent})
- S&P500: ${marketData.globalIndices[0]?.value} (${marketData.globalIndices[0]?.changePercent})
- NASDAQ: ${marketData.globalIndices[1]?.value} (${marketData.globalIndices[1]?.changePercent})
- USD/KRW: ${marketData.macroIndicators[0]?.value}
- 미10년물: ${marketData.macroIndicators[1]?.value}
- VIX: ${marketData.macroIndicators[2]?.value}
- 강세 테마: ${marketData.strongThemes.map(t => t.theme).join(', ')}
- 약세 테마: ${marketData.weakThemes.map(t => t.theme).join(', ')}`;

  const systemPrompt = `당신은 MinM Stock Intelligence의 수석 퀀트 전략가입니다.
레이 달리오(Ray Dalio)의 거시 부채 사이클 이론과 찰리 멍거(Charlie Munger)의 다학제적 사고 모델을 기반으로 분석합니다.
응답은 반드시 한국어로, 전문적이면서도 명확한 문장으로 작성하세요.
${tierNote}`;

  const userPrompt = `[${REPORT_LABELS[reportType]}]
사용자 투자 성향: ${profileLabel}

현재 시장 데이터:
${marketSummary}

위 데이터를 바탕으로 다음 구조로 분석해주세요:

## 1. 시장 현황 요약 (3줄 이내)
## 2. 핵심 매크로 시그널 (2-3개)
## 3. 주도 섹터 & 전략 (${userTier === 'pro' ? '비중/진입가/손절가 포함' : '방향성 위주'})
## 4. 리스크 요인 (2개)
## 5. 오늘의 액션 플랜 (1줄 핵심 결론)`;

  try {
    const result = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    for await (const chunk of result) {
      const text = chunk.text;
      if (text) onChunk(text);
    }
  } catch (err) {
    console.warn('[GeminiService] 스트리밍 실패:', err);
    await streamDemoReport(reportType, userProfile, userTier, onChunk);
  }
}

// ── 데모 리포트 스트리밍 (API Key 없을 때) ───────────────
async function streamDemoReport(
  reportType: ReportType,
  userProfile: UserProfile,
  _tier: UserTier,
  onChunk: (chunk: string) => void
): Promise<void> {
  const demos: Record<ReportType, string> = {
    'pre-market': `## 1. 시장 현황 요약
미국 증시는 전일 소폭 상승 마감했으며, AI 관련 빅테크 실적 기대감이 이어지고 있습니다. KOSPI는 전일 대비 +0.49%로 강보합 출발이 예상됩니다. 달러/원 환율은 1,372원대로 안정적인 흐름을 보이고 있습니다.

## 2. 핵심 매크로 시그널
- **미 10년물 금리 4.28%**: 금리 인하 기대감 유지 → 성장주 우호적 환경
- **VIX 18.4**: 시장 공포 지수 안정 → 단기 변동성 낮음
- **외국인 KOSPI +3,421억 순매수**: 수급 우호적, 대형주 강세 예상

## 3. 주도 섹터 & 전략
${userProfile === 'aggressive' ? '**AI반도체 비중 40%, 방산 20%, 2차전지 20%** 배분 권장.' : userProfile === 'balanced' ? 'AI반도체 중심 성장주 30%, 배당주 20% 혼합 전략.' : '방어적 배당주 및 현금성 자산 비중 유지 권장.'}

## 4. 리스크 요인
- 미 FOMC 추가 매파적 발언 가능성
- 중국 경기 침체 심화 시 수출주 압박 우려

## 5. 오늘의 액션 플랜
AI반도체·방산 주도 상승 속 **외국인 매수 수급 추종 전략**이 유효합니다.`,

    'mid-market': `## 장중 실시간 분석 (시뮬레이션)
⚡ API Key를 연결하면 실시간 스트리밍 퀀트 분석이 제공됩니다.

현재 장중 흐름: AI반도체 섹터 강세 유지, 코스닥 바이오 소폭 약세.`,

    'post-market': `## 장마감 결산 리포트 (시뮬레이션)
📊 API Key를 연결하면 오늘 하루 시장의 종합 결산 리포트가 제공됩니다.

KOSPI 오늘 +0.49% 상승 마감. 외국인 3거래일 연속 순매수.`,
  };

  const text = demos[reportType];
  const chunkSize = 8;
  for (let i = 0; i < text.length; i += chunkSize) {
    onChunk(text.slice(i, i + chunkSize));
    await new Promise(r => setTimeout(r, 25));
  }
}
