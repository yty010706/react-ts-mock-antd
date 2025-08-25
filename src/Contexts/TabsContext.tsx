import { createContext } from 'react';

export interface TabContextProps {
  selectIndex: number;
  onSelect?: (index: number) => void;
  setContent?: (content: any) => void;
}

export const TabsContext = createContext<TabContextProps>({
  selectIndex: 0,
});
