import React from 'react';

type Props = {
  topMissions: any;
};

const TopMissions: React.FC<Props> = ({ topMissions }) => {
  return (
    <div className="card">
      <div className="card-title">Top 5 Missions</div>
      {topMissions
        ? topMissions.map((n, ind) => (
            <p key={ind}>{`${n.missionName} - ${n.payloadKg}`}</p>
          ))
        : null}
    </div>
  );
};

export default TopMissions;
