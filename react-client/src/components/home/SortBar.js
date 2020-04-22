import React from "react";
import styled from "styled-components";
import "bootstrap/js/dist/dropdown";

const Wrapper = styled.div`
  margin: 12px 0px 12px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SortText = styled.div`
  font-weight: 700;
`;

class SortBar extends React.Component {
  state = {
    sort: "Sort by"
  };

  render() {
    return (
      <Wrapper>
        <SortText>
        {
            (this.props.searchTerm === "") &&
            <div>
              Showing: {this.props.numBuildings} dorm{this.props.numBuildings === 1 ? "" : "s"}
            </div>
          }
          {
            (this.props.searchTerm !== "") &&
            <div>
              Showing: {this.props.numBuildings} dorm{this.props.numBuildings === 1 ? "" : "s"}, searched for: "{this.props.searchTerm}"
            </div>
          }
        </SortText>
        <div class="float-right dropdown">
          <a
            class="dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.sort}
          </a>

          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#" onClick={() => this.setState({sort: "Sort by"})}>
              Default
            </a>
            <a class="dropdown-item" href="#" onClick={() => this.setState({sort: "Price: Low to High"})}>
              Price: Low to High
            </a>
            <a class="dropdown-item" href="#" onClick={() => this.setState({sort: "Price: High to Low"})}>
              Price: High to Low
            </a>
            <a class="dropdown-item" href="#" onClick={() => this.setState({sort: "Rating: High to Low"})}>
              Rating: High to Low
            </a>
            <a class="dropdown-item" href="#" onClick={() => this.setState({sort: "Rating: Low to High"})}>
              Rating: Low to High
            </a>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default SortBar;
