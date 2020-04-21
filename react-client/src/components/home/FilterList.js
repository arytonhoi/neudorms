import React from "react";
import styled from "styled-components";

const FiltersWrapper = styled.div`
  margin-top: 12px;
  min-width: 250px;
`;

const FilterWrapper = styled.div`
  margin-bottom: 24px;
`;

const FilterTitle = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

class FilterList extends React.Component {
  state = {
    residentTypes: [],
    maxCost: 0,
    buildingTypes: [],
    roomTypes: [],
    amenities: []
  };

  handleChange = (value) => {
    switch (value) {
      case "Freshmen":
      case "Sophomore":
      case "Upperclassmen":
      case "Graduates":
      case "Law":
        if (this.state.residentTypes.includes(value)) {
          this.setState(prevState => ({
            residentTypes: prevState.residentTypes
              .filter(residentType => residentType !== value)
          }), () => this.props.applyFilters(this.state))
        } else {
          this.setState(prevState =>
            ({
              residentTypes: [...prevState.residentTypes, value]
            }), () => this.props.applyFilters(this.state))
        }
        break;
    }
  }

  render() {
    return (
      <FiltersWrapper>
        {/* <button className="btn btn-success">
          Apply Filter
        </button> */}
        <FilterWrapper>
          <FilterTitle>Resident Type</FilterTitle>
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="firstyear"
              value="Freshmen"
              onChange={(e) => {
                console.log(e.target.value)
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="firstyear">
              First Year
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input"
              type="checkbox"
              value="Sophomore"
              id="secondyear"
              onChange={(e) => {
                console.log(e.target.value)
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="secondyear">
              Second Year
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Upperclassmen" id="upperclassmen"
              onChange={(e) => {
                console.log(e.target.value)
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="upperclassmen">
              Upperclassmen
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Graduates" id="graduate"
              onChange={(e) => {
                console.log(e.target.value)
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="graduate">
              Graduate Students
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Law" id="law"
              onChange={(e) => {
                console.log(e.target.value)
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="law">
              Law Students
            </label>
          </div>
        </FilterWrapper>


        <FilterWrapper>
          <FilterTitle>Cost</FilterTitle>
          <div class="input-group">
            <input type="text" placeholder="Max" class="form-control max-input"/>
            <div class="input-group-append">
              <button class="input-group-text">Apply</button>
            </div>
          </div>
        </FilterWrapper>

        <FilterWrapper>
          <FilterTitle>Building Type</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Economy" />
            <label class="form-check-label" for="Economy">
              Economy
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Standard" />
            <label class="form-check-label" for="Standard">
              Standard
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Enhanced" />
            <label class="form-check-label" for="Enhanced">
              Enhanced
            </label>
          </div>
        </FilterWrapper>

        <FilterWrapper>
          <FilterTitle>Room Type</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Traditional" />
            <label class="form-check-label" for="Traditional">
              Traditional
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Suite-Style" />
            <label class="form-check-label" for="Suite-Style">
              Suite-Style
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Apartment" />
            <label class="form-check-label" for="Apartment">
              Apartment Style
            </label>
          </div>
        </FilterWrapper>

        <FilterWrapper>
          <FilterTitle>Amenities</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Proctor" />
            <label class="form-check-label" for="Proctor">
              Proctor
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Laundry" />
            <label class="form-check-label" for="Laundry">
              Laundry
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Kitchen" />
            <label class="form-check-label" for="Kitchen">
              Kitchen
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Elevator" />
            <label class="form-check-label" for="Elevator">
              Elevator
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Lounge" />
            <label class="form-check-label" for="Lounge">
              Lounge
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Vending" />
            <label class="form-check-label" for="Vending">
              Vending Machines
            </label>
          </div>
        </FilterWrapper>

      </FiltersWrapper>
    );
  }
}

export default FilterList;
