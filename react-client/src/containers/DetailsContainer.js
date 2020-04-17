import React from "react";

class DetailsContainer extends React.Component {
  state = {
    buildingId: this.props.match.params.buildingId
  }

  render() {
    console.log(this.props.match.params.buildingId)
    return (
      <h1>Details page for building {this.state.buildingId}</h1>
    )
  }
}

export default DetailsContainer