export interface Theme {
  name: string;
  type: 'light' | 'dark';
  colors: {
    [key: string]: string;
  };
}

export interface ThemeProvider {
  getCurrentTheme(): Theme;
  getThemes(): Theme[];
  setTheme(theme: Theme): void;
}
