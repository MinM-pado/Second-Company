import React, { useState } from 'react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { HistoricalDataPoint } from '../types';

type ChartTab = 'domestic' | 'global' | 'fx';

interface Props {
  data: HistoricalDataPoint[];
}

const TAB_CONFIG = {
  domestic: {
    label: '🇰🇷 국내 지수',
    lines: [
      { key: 'kospi', name: 'KOSPI', color: '#00D4AA' },
      { key: 'kosdaq', name: 'KOSDAQ', color: '#7C3AED' },
    ],
  },
  global: {
    label: '🌍 미국 지수',
    lines: [
      { key: 'sp500', name: 'S&P 500', color: '#00D4AA' },
      { key: 'nasdaq', name: 'NASDAQ', color: '#F4C430' },
    ],
  },
  fx: {
    label: '💱 환율',
    lines: [
      { key: 'usdkrw', name: 'USD/KRW', color: '#FF6B6B' },
    ],
  },
};

const CustomTooltip: React.FC<{ active?: boolean; payload?: any[]; label?: string }> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-elevated)',
      border: '1px solid var(--bg-border)',
      borderRadius: 'var(--radius-sm)',
      padding: '10px 14px',
      fontSize: 12,
    }}>
      <div style={{ color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} style={{ color: p.color, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>
          {p.name}: <strong>{p.value?.toLocaleString()}</strong>
        </div>
      ))}
    </div>
  );
};

export const MarketTrendChart: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<ChartTab>('domestic');
  const config = TAB_CONFIG[activeTab];

  return (
    <div className="card">
      <div className="section-header">
        <span className="section-title">📈 7거래일 지수 추이</span>
        <div className="tab-group">
          {(Object.keys(TAB_CONFIG) as ChartTab[]).map(tab => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {TAB_CONFIG[tab].label}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-border)" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            axisLine={false} tickLine={false}
            tickFormatter={v => v.toLocaleString()}
            domain={['auto', 'auto']}
            width={72}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'var(--text-secondary)' }}
          />
          {config.lines.map(l => (
            <Line
              key={l.key}
              type="monotone"
              dataKey={l.key}
              name={l.name}
              stroke={l.color}
              strokeWidth={2}
              dot={{ r: 3, fill: l.color, strokeWidth: 0 }}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
