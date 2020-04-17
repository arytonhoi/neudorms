import React from "react";
import { connect } from "react-redux";
import {
    findAllBuildings,
    createBuilding,
    updateBuilding,
    deleteBuilding,
} from "../../actions/BuildingActions";
import buildingService from "../../services/BuildingService";
import BuildingCard from "../home/BuildingCard";
import styled from "styled-components";

const Header = styled.h1`
  font-weight: 900;
`;

class BookmarksList extends React.Component {
    componentDidMount() {
        this.props.findAllBuildings();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //   if (prevProps.topicId !== this.props.topicId) {
    //     this.props.findWidgetsForTopic(this.props.topicId)
    //   }
    // }

    state = {};

    render() {
        return (
            <div>
                <Header className="ml-3">My Bookmarks</Header>
                <div className="row col mx-auto mt-3">
                    {this.props.buildings.map((building) => (
                        <BuildingCard key={building.id} building={building} />
                    ))}
                </div>
            </div>
        );
    }
}

const dispatchToPropertyMapper = (dispatch) => ({
    findAllBuildings: () => {
        buildingService
            .findAllBuildings()
            .then((buildings) => dispatch(findAllBuildings(buildings)));
    },

    createBuilding: (building) => {
        buildingService
            .createBuilding(building)
            .then((building) => dispatch(createBuilding(building)));
    },

    updateBuilding: (buildingId, building) => {
        buildingService
            .updateBuilding(buildingId, building)
            .then((status) => dispatch(updateBuilding(buildingId, building)));
    },

    deleteBuilding: (buildingId) => {
        buildingService
            .deleteBuilding(buildingId)
            .then((status) => dispatch(deleteBuilding(buildingId)));
    },
});

const stateToPropertyMapper = (state) => ({
    buildings: state.buildings.buildings,
});

export default connect(
    stateToPropertyMapper,
    dispatchToPropertyMapper
)(BookmarksList);
