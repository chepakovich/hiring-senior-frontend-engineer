import React from 'react';

type Props = {
  chartData: any;
};

const ByNationality: React.FC<Props> = ({ chartData }) => {
  return (
    <div className="card">
      <div className="card-title">Payload Count By Nationality</div>
      {chartData
        ? chartData.map((n, ind) => (
            <p key={ind}>{`${n.label} - ${Math.round(n.value)}`}</p>
          ))
        : null}
    </div>
  );
};

export default ByNationality;
