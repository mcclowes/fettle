import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    {
      type: 'category',
      label: 'Start here',
      link: {type: 'doc', id: 'start/index'},
      items: ['start/getting-started', 'start/review-a-change'],
    },
    {
      type: 'category',
      label: 'Understand Fettle',
      link: {type: 'doc', id: 'concepts/index'},
      items: ['concepts/review-model', 'concepts/change-sources', 'concepts/saggar'],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {type: 'doc', id: 'reference/index'},
      items: ['reference/commands', 'reference/keyboard'],
    },
  ],
};

export default sidebars;
