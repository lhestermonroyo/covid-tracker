import React from 'react';
import { Drawer } from 'antd';

interface TrackerDrawerInterface {
  visible: boolean;
  selectedProvince: ProvincesInterface | null;
  handleSelectProvince: (item: ProvincesInterface | null) => void;
}

const TrackerDrawer: React.FC<TrackerDrawerInterface> = (props) => {
  const { visible, selectedProvince, handleSelectProvince } = props;

  console.log(selectedProvince);
  return (
    <Drawer
      title={selectedProvince?.province}
      placement="bottom"
      onClose={() => handleSelectProvince(null)}
      visible={visible}
      height={'100%'}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default TrackerDrawer;
