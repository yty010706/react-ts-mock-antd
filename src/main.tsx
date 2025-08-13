import { createRoot } from 'react-dom/client';
import TestButton from './App/TestButton';
import TestAlert from './App/TestAlert';
import TestMenu from './App/TestMenu';
import TestTabs from './App/TestTabs';
import TestIcon from './App/TestIcon';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(<TestMenu />);
