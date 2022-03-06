import React, { useState } from 'react';
import { Typography, List, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import TrackerDrawer from '../TrackerDrawer';

interface ProvinceListProps {
  loadingList: boolean;
  filteredProvinceList: any;
}

const ProvincesList: React.FC<ProvinceListProps> = (props) => {
  const { loadingList, filteredProvinceList } = props;
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] =
    useState<ProvincesInterface | null>(null);

  const handleSelectProvince = (item: ProvincesInterface | null) => {
    setVisible(!visible);
    setSelectedProvince(item);
  };

  return (
    <React.Fragment>
      <TrackerDrawer
        visible={visible}
        selectedProvince={selectedProvince}
        handleSelectProvince={handleSelectProvince}
      />
      <List
        className="list-container"
        loading={loadingList}
        itemLayout="horizontal"
        dataSource={filteredProvinceList}
        renderItem={(item: ProvincesInterface, i: number) => (
          <List.Item
            onClick={() => handleSelectProvince(item)}
            key={i}
            actions={[
              <Button type="link" shape="circle" icon={<RightOutlined />} />,
            ]}
          >
            <List.Item.Meta
              title={
                <Button type="link" size="small">
                  <Typography.Link strong>{item.province}</Typography.Link>
                </Button>
              }
            />
          </List.Item>
        )}
      />
    </React.Fragment>
  );
};

export default ProvincesList;
