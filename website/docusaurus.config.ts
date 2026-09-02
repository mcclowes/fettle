import type {Config} from '@docusaurus/types';
import type {Options, ThemeConfig} from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Fettle docs',
  tagline: 'Review local code changes with context.',
  favicon: 'img/icon.svg',
  url: 'https://fettle.marginalutility.dev',
  baseUrl: '/docs/',
  trailingSlash: true,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'throw'}},
  organizationName: 'mcclowes',
  projectName: 'fettle',
  presets: [[
    'classic',
    {
      docs: {routeBasePath: '/', sidebarPath: './sidebars.ts'},
      blog: false,
      theme: {customCss: './src/css/custom.css'},
    } satisfies Options,
  ]],
  themeConfig: {
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
    navbar: {
      hideOnScroll: true,
      logo: {alt: 'Fettle', src: 'img/logo.svg'},
      items: [
        {href: '/', label: 'Fettle', position: 'left'},
        {href: 'https://github.com/mcclowes/fettle', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'light',
      links: [
        {title: 'Start', items: [{label: 'Getting started', to: '/getting-started'}, {label: 'Review a change', to: '/review-a-change'}]},
        {title: 'Reference', items: [{label: 'Commands', to: '/commands'}, {label: 'How reviews work', to: '/review-model'}]},
        {title: 'Project', items: [{label: 'GitHub', href: 'https://github.com/mcclowes/fettle'}, {label: 'Saggar', href: 'https://saggar.marginalutility.dev'}]},
      ],
      copyright: 'A native macOS review desk, companion to Saggar.',
    },
  } satisfies ThemeConfig,
};

export default config;
