import React from "react";
import Dashboardnav from "../../components/navigation/Dashboardnav";

const Dashboard = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <Dashboardnav />
      </div>
      <div className="col">Your Personal Dashboard</div>
    </div>
  </div>
);

export default Dashboard;
