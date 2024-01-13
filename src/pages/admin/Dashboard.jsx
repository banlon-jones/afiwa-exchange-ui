import React from "react";

import PanelContainer from "../../components/dashboard/PanelContainer";

const Dashboard = ({ children }) => {
  return (
    <PanelContainer>
      <h1
        style={{
          padding: 20,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 25,
        }}
      >
        This page is coming up soon
      </h1>
    </PanelContainer>
  );
};

export default Dashboard;
