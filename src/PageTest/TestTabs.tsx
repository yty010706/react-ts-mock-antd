import Tabs from '@/components/Tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const TabItem = Tabs.Item;

function TestTabs() {
  return (
    <>
      <div>
        <Tabs defaultIndex={0}>
          <TabItem label="首页">主页</TabItem>
          <TabItem label="关注" disabled>
            关注
          </TabItem>
          <TabItem label="设置">
            {
              <h2>
                {123}
                <button>+1</button>
              </h2>
            }
          </TabItem>
        </Tabs>
      </div>
      <FontAwesomeIcon icon={faCoffee} size="xl" color="brown" beat />
    </>
  );
}

export default TestTabs;
