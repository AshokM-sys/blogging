import React from 'react';
import banner from '../assets/banner.jpg';

function Banner() {
  return (
    <div className="row">
      <div className="col-12">
        <img src={banner} alt="Banner" className="img-fluid" />
      </div>
    </div>
  );
}

export default Banner;
