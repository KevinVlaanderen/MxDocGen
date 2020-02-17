export interface Config {
    sdk: {
        username: string,
        apikey: string
    },
    project?: {
        modulePattern?: string
    }
}
