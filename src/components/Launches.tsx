import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  launches: any;
};

const Launches: React.FC<Props> = ({ launches }) => {
  return (
    <div className="card overflow-x-auto mb-10">
      <div className="card-title">SpaceX Launch Data</div>
      {launches && (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>Mission Name</th>
              <th>Date</th>
              <th>Outcome</th>
              <th>Rocket</th>
              <th>Payload Mass</th>
              <th>Site</th>
              <th>Mission ID</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((launch, index) => (
              <tr key={index}>
                <td>{launch['missionName']}</td>
                <td>{launch['date']}</td>
                <td>{launch['outcome'] ? 'Success' : 'Failure'}</td>
                <td>{launch['rocket']}</td>
                <td>{launch['payloadMass']} kg</td>
                <td>{launch['site']}</td>
                <td>{launch['missionId']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Launches;
