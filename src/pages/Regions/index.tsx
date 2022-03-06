import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, List, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Notification from '../../components/Notification';
import RegionList from '../../components/RegionList';
import config from '../../config';

const Regions: React.FC = () => {
  const [searchVal, setSearchVal] = useState<string>('');
  const [regionList, setRegionList] = useState<any>([]);
  const [loadingList, setLoadingList] = useState<boolean>(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      setLoadingList(true);

      const res = await axios.get(`${config.API_ENDPOINT}/regions`, {
        headers: {
          'x-rapidapi-host': config.API_HOST,
          'x-rapidapi-key': config.API_KEY,
        },
      });

      if (res) {
        setRegionList(res.data.data);
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

  const filterRegionList = (regionList: any) => {
    if (searchVal.length !== 0) {
      return regionList.filter(
        (item: RegionInterface) =>
          item.name.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0 ||
          item.iso.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
      );
    }
    return regionList;
  };

  let filteredRegionList = filterRegionList(regionList);

  return (
    <React.Fragment>
      <div className="container">
        <Input
          size="large"
          placeholder="Search region name or iso..."
          prefix={<SearchOutlined />}
          onChange={handleSearch}
          value={searchVal}
        />
      </div>
      <RegionList
        loadingList={loadingList}
        filteredRegionList={filteredRegionList}
      />
    </React.Fragment>
  );
};

export default Regions;
