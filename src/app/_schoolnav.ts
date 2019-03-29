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
  
  export interface SchoolNavData {
    name?: string;
    url?: string;
    icon?: string;
    badge?: NavBadge;
    title?: boolean;
    children?: SchoolNavData[];
    variant?: string;
    attributes?: NavAttributes;
    divider?: boolean;
    class?: string;
    label?: NavLabel;
    wrapper?: NavWrapper;
  }
  
  export const schoolNavItems: SchoolNavData[] = [
  
    {
      name: 'Create Request',
      url: '/school',
      icon: 'icon-puzzle'
    },
    {
      name: 'Reuqest History',
      url: '/buttons',
      icon: 'icon-cursor'
    },
    {
      name: 'Download Reports',
      url: '/charts',
      icon: 'icon-pie-chart'
    }
  ];
  