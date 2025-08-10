import { createRoot } from 'react-dom/client';
import TestButton from './TestButton';
import TestAlert from './TestAlert';
import './styles/index.scss';

createRoot(document.getElementById('root')!).render(<TestButton />);
