import React, { useState } from 'react';
import { ReportType, UserProfile, UserTier, MarketData, AIReport } from '../types';
import { generateQuantReport } from '../services/geminiService';

interface Props {
  marketData: MarketData | null;
  userProfile: UserProfile;
  userTier: UserTier;
  report: AIReport | null;
  isGenerating: boolean;
  onReportUpdate: (report: AIReport) => void;
  onGeneratingChange: (v: boolean) => void;
}

const REPORT_TYPES: { type: ReportType; label: string; icon: string }[] = [
  { type: 'pre-market', label: '개장전', icon: '🌅' },
  { type: 'mid-market', label: '장중', icon: '⚡' },
  { type: 'post-market', label: '장마감', icon: '🌙' },
];

export const AIReportPanel: React.FC<Props> = ({
  marketData, userProfile, userTier, report, isGenerating, onReportUpdate, onGeneratingChange,
}) => {
  const [selectedType, setSelectedType] = useState<ReportType>('pre-market');

  const handleGenerate = async () => {
    if (isGenerating || !marketData) return;
    onGeneratingChange(true);

    const newReport: AIReport = {
      id: Date.now().toString(),
      type: selectedType,
      content: '',
      isStreaming: true,
      timestamp: new Date().toLocaleTimeString('ko-KR'),
      profile: userProfile,
      tier: userTier,
    };
    onReportUpdate(newReport);

    let accumulated = '';
    await generateQuantReport(
      selectedType, marketData, userProfile, userTier,
      (chunk) => {
        accumulated += chunk;
        onReportUpdate({ ...newReport, content: accumulated, isStreaming: true });
      }
    );

    onReportUpdate({ ...newReport, content: accumulated, isStreaming: false });
    onGeneratingChange(false);
  };

  const renderContent = (text: string) => {
    // 마크다운 헤더/볼드 간단 파싱
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) {
        return <div key={i} style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-ai)', marginTop: 14, marginBottom: 4 }}>{line.replace('## ', '')}</div>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <div key={i} style={{ fontWeight: 700, color: 'var(--color-up)', marginBottom: 2 }}>{line.replace(/\*\*/g, '')}</div>;
      }
      if (line.startsWith('- ')) {
        return <div key={i} style={{ paddingLeft: 12, color: 'var(--text-primary)', marginBottom: 2 }}>• {line.slice(2)}</div>;
      }
      if (line.trim() === '') return <div key={i} style={{ height: 6 }} />;
      return <div key={i} style={{ marginBottom: 2 }}>{line}</div>;
    });
  };

  return (
    <div className="card" style={{ borderColor: 'rgba(124, 58, 237, 0.3)' }}>
      {/* 헤더 */}
      <div className="section-header">
        <div className="flex items-center gap-2">
          <span className="section-title">🤖 AI 퀀트 리포트</span>
          <span className="badge badge-ai">Gemini AI</span>
        </div>
        {report?.timestamp && (
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
            {report.timestamp} 생성
          </span>
        )}
      </div>

      {/* 리포트 타입 선택 + 생성 버튼 */}
      <div className="flex items-center gap-3" style={{ marginBottom: 16 }}>
        <div className="tab-group" style={{ flex: 1 }}>
          {REPORT_TYPES.map(({ type, label, icon }) => (
            <button
              key={type}
              className={`tab-btn ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
              style={{ flex: 1 }}
            >
              {icon} {label}
            </button>
          ))}
        </div>
        <button
          className="btn btn-ai"
          onClick={handleGenerate}
          disabled={isGenerating || !marketData}
          style={{ whiteSpace: 'nowrap' }}
        >
          {isGenerating ? '⏳ 분석 중...' : '✨ 리포트 생성'}
        </button>
      </div>

      {/* 리포트 내용 */}
      <div style={{
        minHeight: 180,
        padding: '16px',
        background: 'var(--bg-void)',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--bg-border)',
        fontSize: 13,
        lineHeight: 1.7,
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)',
      }}>
        {!report ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', paddingTop: 40 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🤖</div>
            <div>리포트 타입을 선택하고 <strong style={{ color: 'var(--color-ai)' }}>리포트 생성</strong> 버튼을 눌러주세요.</div>
            <div style={{ fontSize: 11, marginTop: 6, opacity: 0.6 }}>레이 달리오 × 찰리 멍거 프레임으로 분석합니다.</div>
          </div>
        ) : (
          <div className={report.isStreaming ? 'streaming-cursor' : 'fade-in'}>
            {renderContent(report.content)}
          </div>
        )}
      </div>

      {/* 면책 고지 */}
      <div style={{ marginTop: 10, fontSize: 10, color: 'var(--text-muted)', textAlign: 'right' }}>
        ⚠️ AI 분석 결과는 참고용입니다. 투자 결정은 본인 판단으로 하세요.
      </div>
    </div>
  );
};
