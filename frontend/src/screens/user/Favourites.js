import React from "react";
import Dashboardnav from "../../components/navigation/Dashboardnav";

const Favourites = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <Dashboardnav />
      </div>
      <div className="col">Your Favourites</div>
    </div>
  </div>
);

export default Favourites;
