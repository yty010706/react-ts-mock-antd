import { createRoot } from 'react-dom/client';
import TestButton from './App/TestButton';
import TestAlert from './App/TestAlert';
import TestMenu from './App/TestMenu';
import TestTabs from './App/TestTabs';
import TestIcon from './App/TestIcon';
import TestInput from './App/TestInput';
import TestAutoComplete from './App/TestAutoComplete';
import TestUpload from './App/TestUpload';
import TestForm from './App/TestForm';
import './styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

createRoot(document.getElementById('root')!).render(<TestForm />);
