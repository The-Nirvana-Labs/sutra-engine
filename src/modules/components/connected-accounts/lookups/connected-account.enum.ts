export enum ConnectedAccountType {
    Google = 0,
    OpenAI = 1,
}

export enum GoogleAccountPermission {
    NONE = 0,
    DRIVE_READONLY = 1 << 0,
    DRIVE_FILE = 1 << 1,
}
