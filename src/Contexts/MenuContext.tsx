import { ModeType, SelectCb } from '@/components/Menu/menu';
import { createContext } from 'react';

export interface MenuContextProps {
  selectIdx: string;
  onSelect?: SelectCb;
  mode?: ModeType;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<MenuContextProps>({ selectIdx: '0' });
