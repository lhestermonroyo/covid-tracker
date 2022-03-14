import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  PageHeader,
  Typography,
  DatePicker,
  Divider,
  Button,
  Card,
  Row,
  Col,
  Statistic,
  Space,
} from 'antd';
import Notification from '../../components/Notification';
import config from '../../config';
import { ReportInterface } from '../../types/reports';
import { ArrowRightOutlined } from '@ant-design/icons';

const Home: React.FC = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 5);
  const fiveDaysAgo = currentDate.toISOString().split('T')[0];

  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<string>(fiveDaysAgo);
  const [totalReport, setTotalReport] = useState<any>(null);

  useEffect(() => {
    fetchTotalReport(date);
  }, [date]);

  const fetchTotalReport = async (selectedDate: string) => {
    try {
      setLoading(true);

      const res = await axios.get(`${config.API_ENDPOINT}/reports/total`, {
        headers: {
          'x-rapidapi-host': config.API_HOST,
          'x-rapidapi-key': config.API_KEY,
        },
        params: { date: selectedDate },
      });

      setTotalReport(res.data.data);
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

  console.log(totalReport);

  return (
    <React.Fragment>
      <PageHeader className="app-subheader" title="Home" />
      <div className="container">
        <Typography.Paragraph strong>
          Search Report by Date
        </Typography.Paragraph>
        <DatePicker
          defaultValue={moment(date, 'YYYY-MM-DD')}
          value={moment(date, 'YYYY-MM-DD')}
          format={'YYYY-MM-DD'}
          style={{ width: '100%' }}
          size="large"
          onChange={handleDate}
          disabledDate={(current) => {
            return current.isAfter(fiveDaysAgo);
          }}
        />
        <Divider />
        <Typography.Title level={2}>
          World Total as {moment(date, 'YYYY-MM-DD').format('Do of MMMM, YYYY')}
        </Typography.Title>
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <Card>
            <Row gutter={[8, 16]}>
              <Col lg={8} md={8}>
                <Statistic
                  title="Active Cases"
                  value={totalReport?.active}
                  loading={loading}
                />
                {diffFormat(totalReport?.active_diff)}
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Confirmed Cases"
                  value={totalReport?.confirmed}
                  loading={loading}
                />
                {diffFormat(totalReport?.confirmed_diff)}
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Deaths"
                  value={totalReport?.deaths}
                  loading={loading}
                />
                {diffFormat(totalReport?.deaths_diff)}
              </Col>
              <Divider />
              <Col lg={8} md={8}>
                <Statistic
                  title="Recovered"
                  value={totalReport?.recovered}
                  loading={loading}
                />
                {diffFormat(totalReport?.recovered_diff)}
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Fatality Rate"
                  value={totalReport?.fatality_rate}
                  loading={loading}
                />
              </Col>
              <Col lg={8} md={8}>
                <Statistic
                  title="Report Last Updated"
                  value={moment(totalReport?.last_update, 'YYYY-MM-DD').format(
                    'LLL'
                  )}
                  loading={loading}
                />
              </Col>
            </Row>
          </Card>
          <Button type="primary" size="large" href="/regions">
            Track by Region <ArrowRightOutlined />
          </Button>
        </Space>
      </div>
    </React.Fragment>
  );
};

export default Home;
