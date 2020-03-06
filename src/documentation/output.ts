export interface OutputConfig {
    directory: string;
    filename: string;
}

export const defaultOutputConfig: OutputConfig = {
    directory: "out",
    filename: "index.html"
};
