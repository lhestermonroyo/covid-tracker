import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input, PageHeader } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Notification from '../../components/Notification';
import ProvincesList from '../../components/ProvinceList';
import config from '../../config';

const Provinces: React.FC = () => {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams();
  let regionName = searchParams.get('name');
  let regionIso = searchParams.get('iso');

  const [searchVal, setSearchVal] = useState<string>('');
  const [provinceList, setProvinceList] = useState<any>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      setLoadingList(true);

      const res = await axios.get(`${config.API_ENDPOINT}/provinces`, {
        params: { iso: regionIso },
        headers: {
          'x-rapidapi-host': config.API_HOST,
          'x-rapidapi-key': config.API_KEY,
        },
      });

      if (res) {
        setProvinceList(res.data.data);
      } else {
        <Notification
          type="error"
          message="Regions Error"
          description="An error occured while fetching the regions."
        />;
      }
    } catch (error) {
      console.log(error);
      <Notification
        type="error"
        message="Regions Error"
        description="An error occured while fetching the regions."
      />;
    }
    setLoadingList(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const filterProvinceList = (provinceList: any) => {
    if (searchVal.length !== 0) {
      return provinceList.filter(
        (item: ProvincesInterface) =>
          item.province.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
      );
    }
    return provinceList;
  };

  let filteredProvinceList = filterProvinceList(provinceList);

  return (
    <React.Fragment>
      <PageHeader
        className="app-subheader"
        onBack={() => navigate(-1)}
        title={regionName}
        subTitle={regionIso}
      />
      <div className="container">
        <Input
          size="large"
          placeholder="Search province..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          value={searchVal}
        />
      </div>
      <ProvincesList
        loadingList={loadingList}
        filteredProvinceList={filteredProvinceList}
      />
    </React.Fragment>
  );
};

export default Provinces;
