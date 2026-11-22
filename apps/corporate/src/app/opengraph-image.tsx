import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Ops Foundry — Human-AI Operational Infrastructure';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B0F24',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background gradient decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 74, 220, 0.22) 0%, rgba(255, 140, 86, 0.12) 40%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-120px',
            left: '-100px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(10, 140, 255, 0.18) 0%, rgba(120, 71, 255, 0.08) 45%, transparent 70%)',
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Ops Foundry Brand Mark representation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FF8C56 0%, #FF4ADC 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    border: '3px solid #FFFFFF',
                    borderRadius: '4px',
                    transform: 'rotate(45deg)',
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                Ops Foundry
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.9)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Operational Infrastructure
          </div>
        </div>

        {/* Center Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
            paddingTop: '20px',
            paddingBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '54px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.025em',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>Your business has work to do.</span>
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #FF8C56 0%, #FF4ADC 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              We help you get it done.
            </span>
          </div>

          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.45,
              color: 'rgba(255, 255, 255, 0.72)',
              maxWidth: '920px',
              margin: 0,
            }}
          >
            Combining managed teams, structured workflows, and AI-enabled tools to execute digital presence, content visibility, and customer pipeline operations.
          </p>
        </div>

        {/* Bottom Footer Row: Pillars & Services */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.14)',
            paddingTop: '24px',
          }}
        >
          {/* Three Operating Pillars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#FF8C56',
                }}
              />
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>
                Managed Teams
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#FF6B99',
                }}
              />
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>
                Structured Workflows
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#FF4ADC',
                }}
              />
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.95)' }}>
                AI-Enabled Tools
              </span>
            </div>
          </div>

          {/* Three Service Lines */}
          <div
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255, 255, 255, 0.55)',
              letterSpacing: '0.02em',
            }}
          >
            Get Online &bull; Get Visible &bull; Get Customers
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
