import React from "react";
import BuildingCard from "./BuildingCard";
import "bootstrap/js/dist/modal";

class BuildingList extends React.Component {

  render() {
    return (
      <div className="row mt-3">
        {this.props.buildings &&
          this.props.buildings.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              inProfile={this.props.inProfile}
              profile={this.props.profile} />
          ))}
      </div>
    );
  }
}

export default BuildingList;
