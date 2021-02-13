export interface Connection {
    id: number | null;
    name: string;
    description?: string;
    icon: string;
    color: string;
    lanConnection?: LanConnection;
    sshConnection?: SshConnection;
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
