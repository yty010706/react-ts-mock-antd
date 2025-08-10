import { createRoot } from 'react-dom/client';
import TestButton from './App/TestButton';
import TestAlert from './App/TestAlert';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(<TestButton />);
