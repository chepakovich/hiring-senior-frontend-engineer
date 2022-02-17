import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import InfoCard from './InfoCard';
import ByNationality from './ByNationality';
import TopMissions from './TopMissions';
import Launches from './Launches';

// type Props = {
//   posts: readonly RedditPost[]
//   subreddit: string
// }
// const Posts: FunctionComponent<Props> = ({ posts, subreddit }) => (

const Dashboard: React.FC = () => {
  const [launches, setLaunches] = useState([]);
  const [topMissions, setTopMissions] = useState([]);
  const [payloadsData, setPayloadsData] = useState([]);

  const fetchData = () => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios
      .get('/api/launches', { headers })
      .then((res) => {
        console.log('XXX res:', res);
        setLaunches(res.data.launches);
        setTopMissions(res.data.topMissions);
      })
      .catch((error) => {
        console.error('error:', error);
      });

    axios
      .get('/api/payloads', { headers })
      .then((res) => {
        console.log('YYY res:', res);
        setPayloadsData(res.data);
      })
      .catch((error) => {
        console.error('error:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('payloadsData:', payloadsData);
  // console.log('launchesData:', launchesData);
  // console.log('launches:', launchesData.launches);
  return (
    <div>
      <div className="sticky top-0 z-50">
        <div className="wrapper">
          <TopBar />
        </div>
      </div>
      <div className="wrapper">
        <div className="md:flex gap-4 mb-4">
          <InfoCard
            value={payloadsData.totalPayloads}
            name={'Total Payloads'}
            icon={
              'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
            }
            color={'teal'}
          />
          <InfoCard
            value={payloadsData.averageMass}
            name={'Avg. Payload Mass'}
            icon={
              'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
            }
            color={'indigo'}
          />
          <InfoCard
            value={payloadsData.totalCustomers}
            name={'Total Payload Customers'}
            icon={
              'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            }
            color={'chocolate'}
          />
        </div>
        <div className="md:flex gap-4 mb-4">
          <ByNationality chartData={payloadsData.chartData} />
          <TopMissions topMissions={topMissions} />
        </div>
        <Launches launches={launches} />
      </div>
    </div>
  );
};

export default Dashboard;
