import Icon from '@/components/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
function TestIcon() {
  return (
    <>
      <Icon icon="area-chart" theme="danger" size="2x" shake />
    </>
  );
}

export default TestIcon;
