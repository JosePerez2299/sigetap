// types/navigation.ts
export interface NavLink {
    id: number;
    path: string;
    label: string;
    icon?: string | React.ReactNode;
    external?: boolean;
    submenu?: SubNavLink[];
  }
  
  export interface SubNavLink {
    id: number;
    path: string;
    label: string;
    icon?: string | React.ReactNode;
  }
  
  export interface NavbarProps {
    links: NavLink[];
    logo?: string | React.ReactNode;
    className?: string;
  }