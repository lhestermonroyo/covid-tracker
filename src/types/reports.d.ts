import { valueType } from 'antd/lib/statistic/utils';

interface ReportInterface {
  active: valueType;
  active_diff: valueType;
  confirmed: valueType;
  confirmed_diff: valueType;
  date: valueType;
  deaths: valueType;
  deaths_diff: valueType;
  fatality_rate: valueType;
  last_update: valueType;
  recovered: valueType;
  recovered_diff: valueType;
  region: [];
}

interface ReportsInterface {
  reports: ReportInterface[];
}
