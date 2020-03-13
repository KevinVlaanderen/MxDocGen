export interface OutputConfig {
	directory: string;
	filename: string;
}

export const defaultOutputConfig: OutputConfig = {
	directory: "output",
	filename: "index.html"
};
