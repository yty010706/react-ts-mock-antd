import Tabs from '@/components/Tabs';

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
          <TabItem label="设置">{<div>123</div>}</TabItem>
        </Tabs>
      </div>
    </>
  );
}

export default TestTabs;
