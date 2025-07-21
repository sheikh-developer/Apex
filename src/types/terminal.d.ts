export interface ITerminal {
  clear(): void;
  focus(): void;
  write(data: string): void;
  onData(listener: (data: string) => void): void;
  onResize(listener: (cols: number, rows: number) => void): void;
  fit(): void;
  proposeDimensions(): { rows: number; cols: number } | undefined;
  loadAddon(addon: any): void;
  setOption(key: string, value: any): void;
  dispose(): void;
}