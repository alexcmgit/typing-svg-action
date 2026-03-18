export interface SvgParams {
  lines: string | string[];
  font?: string;
  weight?: string;
  color?: string;
  background?: string;
  size?: number;
  center?: boolean;
  vCenter?: boolean;
  width?: number;
  height?: number;
  multiline?: boolean;
  duration?: number;
  pause?: number;
  repeat?: boolean;
  separator?: string;
  random?: boolean;
  letterSpacing?: string;
}

export const DEFAULTS: Required<Omit<SvgParams, 'lines'>> = {
  font: 'monospace',
  weight: '400',
  color: '#36BCF7',
  background: '#00000000',
  size: 20,
  center: false,
  vCenter: false,
  width: 400,
  height: 50,
  multiline: false,
  duration: 5000,
  pause: 0,
  repeat: true,
  separator: ';',
  random: false,
  letterSpacing: 'normal',
};
