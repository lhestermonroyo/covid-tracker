import React, { useEffect, useState } from 'react';
import { Typography, List, Button } from 'antd';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface ProvinceListProps {
  loadingList: boolean;
  filteredProvinceList: any;
}

const ProvincesList: React.FC<ProvinceListProps> = (props) => {
  const { loadingList, filteredProvinceList } = props;

  return (
    <List
      className="list-container"
      loading={loadingList}
      itemLayout="horizontal"
      dataSource={filteredProvinceList}
      renderItem={(item: ProvincesInterface, i: number) => (
        <List.Item
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
  );
};

export default ProvincesList;
