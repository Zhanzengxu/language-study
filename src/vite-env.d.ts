/// <reference types="vite/client" />

declare module 'vite' {
  export function defineConfig(config: any): any;
}

declare module '@vitejs/plugin-react' {
  interface ReactPluginOptions {
    include?: string | string[];
    exclude?: string | string[];
    babel?: any;
    parserOpts?: any;
  }
  function react(options?: ReactPluginOptions): any;
  export default react;
}

declare module 'vite-tsconfig-paths' {
  function tsconfigPaths(): any;
  export default tsconfigPaths;
}

declare module 'vite-plugin-trae-solo-badge' {
  interface BadgeOptions {
    variant?: 'dark' | 'light';
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    prodOnly?: boolean;
    clickable?: boolean;
    clickUrl?: string;
    autoTheme?: boolean;
    autoThemeTarget?: string;
  }
  export function traeBadgePlugin(options?: BadgeOptions): any;
  export const traeBadge: any;
}
