import React from 'react';
import { IndexData, ChangeDirection } from '../types';

interface Props {
  domesticIndices: IndexData[];
  globalIndices: IndexData[];
  macroIndicators: IndexData[];
  isLoading: boolean;
}

const ArrowIcon: React.FC<{ direction: ChangeDirection }> = ({ direction }) => {
  if (direction === 'up') return <span style={{ color: 'var(--color-up)' }}>▲</span>;
  if (direction === 'down') return <span style={{ color: 'var(--color-down)' }}>▼</span>;
  return <span style={{ color: 'var(--color-neutral)' }}>—</span>;
};

const IndexCard: React.FC<{ item: IndexData }> = ({ item }) => (
  <div className={`index-card ${item.direction}`}>
    <div className="index-name">{item.name}</div>
    {item.description && (
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{item.description}</div>
    )}
    <div className="index-value">
      {item.value}
      {item.unit && <span style={{ fontSize: 13, marginLeft: 4, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{item.unit}</span>}
    </div>
    <div className={`index-change ${item.direction}`}>
      <ArrowIcon direction={item.direction} />
      <span>{item.change}</span>
      {item.changePercent && (
        <span className={`badge ${item.direction === 'up' ? 'badge-up' : item.direction === 'down' ? 'badge-down' : ''}`} style={{ fontSize: 10, padding: '2px 6px' }}>
          {item.changePercent}
        </span>
      )}
    </div>
  </div>
);

const SkeletonCard: React.FC = () => (
  <div className="index-card" style={{ borderLeft: '3px solid var(--bg-border)' }}>
    <div className="skeleton" style={{ height: 12, width: '60%', marginBottom: 8 }} />
    <div className="skeleton" style={{ height: 22, width: '80%', marginBottom: 6 }} />
    <div className="skeleton" style={{ height: 12, width: '50%' }} />
  </div>
);

export const MarketOverview: React.FC<Props> = ({ domesticIndices, globalIndices, macroIndicators, isLoading }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 국내 지수 */}
      <section>
        <div className="section-header">
          <span className="section-title">🇰🇷 국내 증시</span>
          <span className="badge badge-up" style={{ fontSize: 10 }}>LIVE</span>
        </div>
        <div className="grid-3">
          {isLoading
            ? Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : domesticIndices.map(item => <IndexCard key={item.id} item={item} />)
          }
        </div>
      </section>

      {/* 해외 지수 */}
      <section>
        <div className="section-header">
          <span className="section-title">🌍 해외 선행 지수</span>
        </div>
        <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {isLoading
            ? Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : globalIndices.map(item => <IndexCard key={item.id} item={item} />)
          }
        </div>
      </section>

      {/* 매크로 지표 */}
      <section>
        <div className="section-header">
          <span className="section-title">⚡ 핵심 매크로 지표</span>
        </div>
        <div className="grid-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {isLoading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : macroIndicators.map(item => <IndexCard key={item.id} item={item} />)
          }
        </div>
      </section>
    </div>
  );
};
