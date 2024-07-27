import React from 'react';
import { Spin } from 'antd';

const loadingPage = () => {
  return (
    <div>
      <span className="flex flex-col items-center justify-center h-screen bg-white">
        <Spin size="default" />
      </span>
    </div>
  );
};

export default loadingPage;
