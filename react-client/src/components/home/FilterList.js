import React from "react";
import styled from "styled-components";

const FiltersWrapper = styled.div`
  margin-top: 12px;
  margin-right: 48px;
  width: 500px;
`;

const FilterWrapper = styled.div`
  margin-bottom: 24px;
`;

const FilterTitle = styled.div`
  font-weight: 700;
  margin-bottom: 6px;
`;

class FilterList extends React.Component {
  state = {};

  render() {
    return (
      <FiltersWrapper>
        <FilterWrapper>
          <FilterTitle>Resident Type</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="firstyear"/>
            <label class="form-check-label" for="firstyear">
              First Year
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="secondyear" />
            <label class="form-check-label" for="secondyear">
              Second Year
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="upperclassmen" />
            <label class="form-check-label" for="upperclassmen">
              Upperclassmen
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="graduate" />
            <label class="form-check-label" for="graduate">
              Graduate Students
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="law" />
            <label class="form-check-label" for="law">
              Law Students
            </label>
          </div>
        </FilterWrapper>
          
          
        <FilterWrapper>
        <FilterTitle>Cost</FilterTitle>
          <div class="input-group">
            <input type="text" placeholder="Max" class="form-control" />
            <div class="input-group-append">
              <button class="input-group-text">Apply</button>
            </div>
          </div>
        </FilterWrapper>

        <FilterWrapper>
          <FilterTitle>Building Type</FilterTitle>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="Economy"/>
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
            <input class="form-check-input" type="checkbox" value="" id="Traditional"/>
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
            <input class="form-check-input" type="checkbox" value="" id="Proctor"/>
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
