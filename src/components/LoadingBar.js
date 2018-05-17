import React from 'react';

import { progressBarFetch, setOriginalFetch, ProgressBar } from 'react-fetch-progressbar';

// HACK: is there no other way?
setOriginalFetch(window.fetch); // eslint-disable-line
window.fetch = progressBarFetch; // eslint-disable-line

const style = {
  height: '2px',
  backgroundColor: '#60ac5d',
};

const LoadingBar = () => (
  <div>
    <ProgressBar style={style} />
  </div>
);

export default LoadingBar;
