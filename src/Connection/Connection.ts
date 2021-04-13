export const ALL_ICONS = ['tv', 'server', 'network-wired', 'laptop', 'robot', 'tablet'] as const;
export type IconType = typeof ALL_ICONS[number];

export const ALL_COLORS = ['#35bf5c', '#ea4335', '#f19601', '#1c6697', '#976ED7'] as const;
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
