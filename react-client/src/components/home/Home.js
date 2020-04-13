import React from "react";
import BuildingCard from "./BuildingCard";

class Home extends React.Component {
  render() {
    return (
      <div>
        <h2 className="col ml-3">First Year Dorms</h2>
        <div className="row col mx-auto">
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
        </div>

        <h2 className="col ml-3 mt-5">Second Year Dorms</h2>
        <div className="row col mx-auto">
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
        </div>

        <h2 className="col ml-3 mt-5">Upperclassmen Dorms</h2>
        <div className="row col mx-auto">
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
        </div>

        <h2 className="col ml-3 mt-5">Graduate Student Dorms</h2>
        <div className="row col mx-auto">
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
          <BuildingCard />
        </div>

        <h2 className="col ml-3 mt-5">Law Student Dorms</h2>
        <div className="row col mx-auto">
          <BuildingCard />
          <BuildingCard />
        </div>
      </div>
    );
  }
}

export default Home;
