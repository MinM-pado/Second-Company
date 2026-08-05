import React from 'react';

interface Props {
  title: string;
  lastUpdated: string | null;
  isLoading: boolean;
  onRefresh: () => void;
}

export const Header: React.FC<Props> = ({ title, lastUpdated, isLoading, onRefresh }) => {
  const [currentTime, setCurrentTime] = React.useState('');

  React.useEffect(() => {
    const update = () => {
      setCurrentTime(new Date().toLocaleTimeString('ko-KR', {
        timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', second: '2-digit'
      }));
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--bg-border)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <div className="container">
        <div className="flex items-center justify-between" style={{ height: 60 }}>
          {/* 로고 */}
          <div className="flex items-center gap-3">
            <div style={{
              width: 34, height: 34,
              background: 'linear-gradient(135deg, var(--color-up), var(--color-ai))',
              borderRadius: 'var(--radius-sm)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 800, color: '#fff',
            }}>M</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                {title}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>
                AI STOCK INTELLIGENCE TERMINAL
              </div>
            </div>
          </div>

          {/* 중앙 실시간 시각 */}
          <div className="flex items-center gap-3">
            <div className="pulse-dot" />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              KST {currentTime}
            </div>
          </div>

          {/* 우측 액션 */}
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                업데이트: {lastUpdated}
              </div>
            )}
            <button
              className="btn btn-secondary"
              onClick={onRefresh}
              disabled={isLoading}
              style={{ fontSize: 12, padding: '6px 14px' }}
            >
              {isLoading ? '⏳ 로딩 중...' : '🔄 새로고침'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
