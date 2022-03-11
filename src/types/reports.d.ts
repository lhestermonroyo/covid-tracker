interface ReportInterface {
  active: Number;
  active_diff: Number;
  confirmed: Number;
  confirmed_diff: Number;
  date: String;
  deaths: Number;
  deaths_diff: Number;
  fatality_rate: Number;
  last_updated: String;
  recovered: Number;
  recovered_diff: Number;
  region: [];
}

interface ReportsInterface {
  reports: ReportInterface[];
}
