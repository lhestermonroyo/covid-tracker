import React from 'react';
import { Link } from 'react-router-dom';
import { Button, PageHeader } from 'antd';
import { GithubFilled } from '@ant-design/icons';

const Header = () => {
  return (
    <PageHeader
      className="app-header"
      title="Covid19 Tracker"
      extra={[
        <Link to="/" key={1}>
          <Button size="small" type="text">
            Home
          </Button>
        </Link>,
        <Link to="/regions" key={2}>
          <Button size="small" type="text">
            Regions
          </Button>
        </Link>,
        <Button
          type="link"
          size="large"
          shape="circle"
          icon={<GithubFilled />}
          key={3}
        />,
      ]}
    />
  );
};

export default Header;
