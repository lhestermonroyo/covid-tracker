import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, DatePicker, Divider, Drawer, List, Typography } from 'antd';
import Notification from '../Notification';
import config from '../../config';
import moment from 'moment';
import { report } from 'process';

interface TrackerDrawerInterface {
  visible: boolean;
  selectedProvince: ProvincesInterface | null;
  handleSelectProvince: (item: ProvincesInterface | null) => void;
}

const TrackerDrawer: React.FC<TrackerDrawerInterface> = (props) => {
  const { visible, selectedProvince, handleSelectProvince } = props;

  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 5);
  const fiveDaysAgo = currentDate.toISOString().split('T')[0];

  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<string>(fiveDaysAgo);
  const [reports, setReports] = useState<any>(null);

  useEffect(() => {
    if (visible) {
      fetchReports(date);
    }
  }, [visible]);

  const fetchReports = async (selectedDate: string) => {
    try {
      setLoading(true);

      const res = await axios.get(`${config.API_ENDPOINT}/reports`, {
        params: {
          region_province: selectedProvince?.province,
          iso: selectedProvince?.iso,
          region_name: selectedProvince?.name,
          q: `${selectedProvince?.name} ${selectedProvince?.province}`,
          date: selectedDate,
        },
        headers: {
          'x-rapidapi-host': config.API_HOST,
          'x-rapidapi-key': config.API_KEY,
        },
      });

      setReports(res.data.data);
    } catch (err) {
      console.log(err);

      <Notification
        type="error"
        message="Reports Error"
        description="An error occured while fetching the Reports."
      />;
    }
    setLoading(false);
  };

  console.log(reports);

  return (
    <Drawer
      title={selectedProvince?.province}
      placement="left"
      onClose={() => handleSelectProvince(null)}
      visible={visible}
      width={'70%'}
    >
      <DatePicker
        defaultValue={moment(date, 'YYYY-MM-DD')}
        format={'YYYY-MM-DD'}
        style={{ width: '100%' }}
        disabledDate={(current) => {
          return current.isAfter(fiveDaysAgo);
        }}
      />
      <Divider />
      <Typography.Title level={2}>
        Report as of the {moment(date, 'YYYY-MM-DD').format('Do MMMM, YYYY')}
      </Typography.Title>
      {/* <List
        loading={loading}
        grid={{ gutter: 16, lg: 6 }}
        dataSource={reports}
        renderItem={(item: ReportInterface) => (
          <Card title={item.active}> </Card>
        )}
      /> */}
    </Drawer>
  );
};

export default TrackerDrawer;
