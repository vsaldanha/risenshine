interface NavAttributes {
    [propName: string]: any;
  }
  interface NavWrapper {
    attributes: NavAttributes;
    element: string;
  }
  interface NavBadge {
    text: string;
    variant: string;
  }
  interface NavLabel {
    class?: string;
    variant: string;
  }
  
  export interface OrgNavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: OrgNavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
  }
  
  export const orgNavItems: OrgNavData[] = [
  
    {
      name: 'Confirm Request',
      url: '/school',
      icon: 'icon-puzzle'
    },
    {
      name: 'Volunteers',
      url: '/requestHistory',
      icon: 'icon-cursor'
    },
    {
        name: 'Event History',
        url: '/requestHistory',
        icon: 'icon-cursor'
      },

  ];
  