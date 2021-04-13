export const ALL_ICONS = [
  'tv',
  'server',
  'network-wired',
  'laptop',
  'robot',
  'tablet',
] as const;
export type IconType = typeof ALL_ICONS[number];

export const ALL_COLORS = [
  '#0476E9',
  '#0597E2',
  '#077436',
  '#F2B90D',
  '#F21906',
] as const;
export type ColorType = typeof ALL_COLORS[number];

export interface Connection {
  id: number;
  name: string;
  description?: string;
  icon: IconType;
  color: ColorType;
  lanConnection: LanConnection;
  sshConnection: SshConnection;
}

interface LanConnection {
  macAddress: string;
}

interface SshConnection {
  domain: string;
  username: string;
  password: string;
  port: number;
}
