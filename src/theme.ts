export const theme = {
  bg: '#050505',
  bg2: '#0b0b0d',
  hero: '#ff161f',
  accent: '#ff3b45',
  accentSoft: '#ff5963',
  text: '#ffffff',
  muted: '#a9a9ae',
  card: 'rgba(255,255,255,0.07)',
  line: 'rgba(255,22,31,0.14)',
  radius: 34,
  shadow: '0 24px 70px rgba(0,0,0,0.45)',
  font: 'Hind Siliguri, Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
};

export const easing = {
  enter: [0.16, 1, 0.3, 1] as const,
  smooth: [0.65, 0, 0.35, 1] as const,
};

export const scenes = [
  {from: 0.08, to: 4.9},
  {from: 4.9, to: 11.76},
  {from: 11.76, to: 14.1},
  {from: 14.78, to: 21.16},
  {from: 21.16, to: 27.7},
  {from: 27.7, to: 33.46},
  {from: 33.46, to: 40.4},
];
