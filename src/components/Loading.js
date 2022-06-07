import React from 'react';
import "./Loading.css";

function Loading() {
  return (
    <div className="centerContainer loadingCenter">
      <div className="subCenterContainer">
        <div className="loaderContainer">
          <h2>Loading</h2>
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;