import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  DatePicker,
  Divider,
  Drawer,
  List,
  Statistic,
  Typography,
  Row,
  Col,
} from 'antd';
import Notification from '../Notification';
import config from '../../config';
import moment from 'moment';
import { ReportInterface } from '../../types/reports';

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
  const [reports, setReports] = useState<any>([]);

  useEffect(() => {
    if (visible) {
      fetchReports(date);
    }
  }, [visible, date]);

  useEffect(() => {
    return () => {
      setDate(fiveDaysAgo);
      setReports([]);
    };
  }, []);

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

  const handleDate = (date: any, dateString: any) => {
    setDate(dateString);
  };

  const diffFormat = (diffItem: any) => {
    if (loading) {
      return null;
    }

    if (typeof diffItem === 'string') {
      diffItem = parseInt(diffItem);
    }

    return (
      <Typography.Text
        type={diffItem > 0 ? 'success' : diffItem === 0 ? 'success' : 'danger'}
      >
        {diffItem > 0 ? '+' : diffItem === 0 ? null : '-'}
        {diffItem}
      </Typography.Text>
    );
  };

  return (
    <Drawer
      title={selectedProvince?.province}
      placement="left"
      onClose={() => handleSelectProvince(null)}
      visible={visible}
      width={'80%'}
    >
      <Typography.Paragraph strong>Search Report by Date</Typography.Paragraph>
      <DatePicker
        defaultValue={moment(date, 'YYYY-MM-DD')}
        value={moment(date, 'YYYY-MM-DD')}
        format={'YYYY-MM-DD'}
        style={{ width: '100%' }}
        onChange={handleDate}
        disabledDate={(current) => {
          return current.isAfter(fiveDaysAgo);
        }}
      />
      <Divider />
      <Typography.Title level={2}>
        Report as {moment(date, 'YYYY-MM-DD').format('Do of MMMM, YYYY')}
      </Typography.Title>
      <List
        loading={loading}
        dataSource={reports}
        renderItem={(item: ReportInterface, i: number) => (
          <Card key={i}>
            <Row gutter={[8, 16]}>
              <Col lg={8} md={8}>
                <Statistic
                  title="Active Cases"
                  value={item.active}
                  loading={loading}
                />
                {diffFormat(item.active_diff)}
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Confirmed Cases"
                  value={item.confirmed}
                  loading={loading}
                />
                {diffFormat(item.confirmed_diff)}
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Deaths"
                  value={item.deaths}
                  loading={loading}
                />
                {diffFormat(item.deaths_diff)}
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Recovered"
                  value={item.recovered}
                  loading={loading}
                />
                {diffFormat(item.recovered_diff)}
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Fatality Rate"
                  value={item.fatality_rate}
                  loading={loading}
                />
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Report Last Updated"
                  value={moment(item.last_update, 'YYYY-MM-DD').format('LLL')}
                  loading={loading}
                />
              </Col>
            </Row>
          </Card>
        )}
      />
    </Drawer>
  );
};

export default TrackerDrawer;
