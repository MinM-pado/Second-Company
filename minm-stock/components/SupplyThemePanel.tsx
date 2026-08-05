import React from 'react';
import { SupplyData, ThemeData } from '../types';

interface Props {
  supply: SupplyData[];
  strongThemes: ThemeData[];
  weakThemes: ThemeData[];
  isLoading: boolean;
}

export const SupplyThemePanel: React.FC<Props> = ({ supply, strongThemes, weakThemes, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid-2">
        {[0, 1].map(i => (
          <div key={i} className="card">
            <div className="skeleton" style={{ height: 13, width: '40%', marginBottom: 16 }} />
            {[0, 1, 2].map(j => (
              <div key={j} style={{ marginBottom: 12 }}>
                <div className="skeleton" style={{ height: 11, width: '70%', marginBottom: 4 }} />
                <div className="skeleton" style={{ height: 6, borderRadius: 3 }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid-2">
      {/* 투자자 수급 */}
      <div className="card">
        <div className="section-header" style={{ marginBottom: 14 }}>
          <span className="section-title">💰 투자자별 수급 (KOSPI)</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {supply.map((s, i) => {
            const val = parseInt(s.kospi.replace(/[^-\d]/g, ''));
            const abs = Math.abs(val);
            const max = 6000;
            const pct = Math.min((abs / max) * 100, 100);
            return (
              <div key={i}>
                <div className="flex justify-between items-center" style={{ marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 600 }}>{s.investor}</span>
                  <span style={{
                    fontSize: 12, fontFamily: 'var(--font-mono)', fontWeight: 600,
                    color: s.direction === 'up' ? 'var(--color-up)' : s.direction === 'down' ? 'var(--color-down)' : 'var(--text-secondary)',
                  }}>
                    {s.kospi}억
                  </span>
                </div>
                <div className="supply-bar-wrap">
                  <div
                    className="supply-bar"
                    style={{
                      width: `${pct}%`,
                      background: s.direction === 'up' ? 'var(--color-up)' : s.direction === 'down' ? 'var(--color-down)' : 'var(--bg-border)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 주도 테마 */}
      <div className="card">
        <div className="section-header" style={{ marginBottom: 14 }}>
          <span className="section-title">🎯 주도 테마</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {strongThemes.map((t, i) => (
            <div key={i} className="flex justify-between items-center" style={{
              padding: '8px 10px',
              background: 'var(--color-up-subtle)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '2px solid var(--color-up)',
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-up)' }}>{t.theme}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{t.leadingStock} · {t.reason}</div>
              </div>
              <span className="badge badge-up">{t.changePercent}</span>
            </div>
          ))}
          {weakThemes.map((t, i) => (
            <div key={i} className="flex justify-between items-center" style={{
              padding: '8px 10px',
              background: 'var(--color-down-subtle)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '2px solid var(--color-down)',
            }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-down)' }}>{t.theme}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{t.leadingStock} · {t.reason}</div>
              </div>
              <span className="badge badge-down">{t.changePercent}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
