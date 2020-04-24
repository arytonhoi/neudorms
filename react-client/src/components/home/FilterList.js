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
      case "First Year":
      case "Second Year":
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

      case "Economy":
      case "Standard":
      case "Enhanced":
        if (this.state.buildingTypes.includes(value)) {
          this.setState(prevState => ({
            buildingTypes: prevState.buildingTypes
              .filter(buildingType => buildingType !== value)
          }), () => this.props.applyFilters(this.state))
        } else {
          this.setState(prevState =>
            ({
              buildingTypes: [...prevState.buildingTypes, value]
            }), () => this.props.applyFilters(this.state))
        }
        break;

      case "Proctor":
      case "Laundry":
      case "Kitchen":
      case "Elevator":
      case "Lounge":
      case "Vending":
        if (this.state.amenities.includes(value)) {
          this.setState(prevState => ({
            amenities: prevState.amenities
              .filter(amenity => amenity !== value)
          }), () => this.props.applyFilters(this.state))
        } else {
          this.setState(prevState =>
            ({
              amenities: [...prevState.amenities, value]
            }), () => this.props.applyFilters(this.state))
        }
        break;

      case "Traditional":
      case "Suite":
      case "Apartment":
        if (this.state.roomTypes.includes(value)) {
          this.setState(prevState => ({
            roomTypes: prevState.roomTypes
              .filter(roomType => roomType !== value)
          }), () => this.props.applyFilters(this.state))
        } else {
          this.setState(prevState =>
            ({
              roomTypes: [...prevState.roomTypes, value]
            }), () => this.props.applyFilters(this.state))
        }
        break;

      default:
        this.setState(prevState =>
          ({
            maxCost: value
          }), () => this.props.applyFilters(this.state))
        break;
    }
  }

  render() {
    return (
      <FiltersWrapper className="d-none d-md-block">
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
              value="First Year"
              onChange={(e) => {
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
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="secondyear">
              Second Year
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Upperclassmen" id="upperclassmen"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="upperclassmen">
              Upperclassmen
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Graduates" id="graduate"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="graduate">
              Graduate Students
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Law" id="law"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="law">
              Law Students
            </label>
          </div>
        </FilterWrapper>


        <FilterWrapper>
          <FilterTitle>Max Cost</FilterTitle>
          <div class="input-group">
            <input type="text" placeholder="Max" class="form-control max-input"
              value={this.state.maxCost}
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            {/* <div class="input-group-append">
              <button class="input-group-text">Apply</button>
            </div> */}
          </div>
        </FilterWrapper>

        <FilterWrapper>
          <FilterTitle>Building Type</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Economy" id="Economy"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Economy">
              Economy
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Standard" id="Standard"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Standard">
              Standard
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Enhanced" id="Enhanced"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Enhanced">
              Enhanced
            </label>
          </div>
        </FilterWrapper>

        <FilterWrapper>
          <FilterTitle>Room Type</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Traditional" id="Traditional"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Traditional">
              Traditional
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Suite" id="Suite-Style"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Suite-Style">
              Suite-Style
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Apartment" id="Apartment"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Apartment">
              Apartment Style
            </label>
          </div>
        </FilterWrapper>

        <FilterWrapper>
          <FilterTitle>Amenities</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Proctor" id="Proctor"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Proctor">
              Proctor
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Laundry" id="Laundry"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Laundry">
              Laundry
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Kitchen" id="Kitchen"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Kitchen">
              Kitchen
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Elevator" id="Elevator"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Elevator">
              Elevator
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Lounge" id="Lounge"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
            <label class="form-check-label" for="Lounge">
              Lounge
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="Vending" id="Vending"
              onChange={(e) => {
                this.handleChange(e.target.value)
              }} />
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
