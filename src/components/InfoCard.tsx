import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Props = {
  value: number;
  name: string;
  icon: string;
  color: string;
};

const InfoCard: React.FC<Props> = ({ value, name, icon, color }) => {
  return (
    <div className="infocard">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mt-0.5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={icon}
          />
        </svg>
        <div>
          <div className="infocard-main">{value}</div>
          <div className="infocard-sub">{name}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
