import { useState, useEffect, useRef } from 'react'

// Animated equalizer bars — visual only, gives the page an "alive" music feel
export default function AudioVibes() {
  const bars = Array.from({ length: 5 }, (_, i) => i)

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'flex-end',
      gap: '2px', height: '16px', padding: '0 2px',
    }}>
      {bars.map(i => (
        <div key={i} style={{
          width: '2px',
          background: '#c9a84c',
          borderRadius: '1px',
          animation: `eq ${0.8 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
          opacity: 0.7,
        }} />
      ))}
      <style>{`
        @keyframes eq {
          from { height: 3px;  }
          to   { height: 14px; }
        }
      `}</style>
    </div>
  )
}
