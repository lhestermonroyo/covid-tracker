import React, { useEffect, useState } from 'react';
import { Typography, List, Button } from 'antd';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface RegionListProps {
  loadingList: boolean;
  filteredRegionList: any;
}

const RegionList: React.FC<RegionListProps> = (props) => {
  const { loadingList, filteredRegionList } = props;

  return (
    <List
      className="list-container"
      loading={loadingList}
      itemLayout="horizontal"
      dataSource={filteredRegionList}
      renderItem={(item: RegionInterface, i: number) => (
        <Link to={`/provinces?name=${item.name}&iso=${item.iso}`}>
          <List.Item
            key={i}
            actions={[
              <Button type="link" shape="circle" icon={<RightOutlined />} />,
            ]}
          >
            <List.Item.Meta
              title={
                <Button type="link" size="small">
                  <Typography.Link strong>{item.name}</Typography.Link>
                </Button>
              }
              description={
                <Button type="link" size="small">
                  <Typography.Text type="secondary">{item.iso}</Typography.Text>
                </Button>
              }
            />
          </List.Item>
        </Link>
      )}
    />
  );
};

export default RegionList;
