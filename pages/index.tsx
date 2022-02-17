import type { NextPage } from 'next';
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import React from 'react';
import Dashboard from '../src/components/Dashboard';

const Home: NextPage = () => {
  return (
    <div className="px-6">
      <Dashboard />
    </div>
  );
};

export default Home;
