import { ImageResponse } from 'next/og';

export const alt = 'Runway Calculator – Calculate Your Cash Runway';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              backgroundColor: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            $
          </div>
          <span style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Runway<span style={{ color: '#818cf8' }}>Calculator</span>.dev
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              padding: '6px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(129, 140, 248, 0.4)',
              color: '#c7d2fe',
              fontSize: '18px',
              fontWeight: 600,
              alignSelf: 'flex-start',
            }}
          >
            100% Client-Side • Private • Real-Time
          </div>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Calculate Your Cash Runway
          </h1>
          <p
            style={{
              fontSize: '26px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '900px',
              margin: 0,
            }}
          >
            Estimate monthly gross burn, net burn, break-even timeline, and projected cash depletion dates.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '28px',
            fontSize: '20px',
            color: '#cbd5e1',
          }}
        >
          <span>Available for Startups, SaaS, SMBs &amp; Freelancers</span>
          <span style={{ color: '#34d399', fontWeight: 700 }}>Free &amp; Open</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
