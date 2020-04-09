import React from "react";

class BuildingCard extends React.Component {
  render() {
    return (
      <div className="card-container mt-3 mb-2 col-3 d-flex align-items-stretch">
        <div class="card">
          <a className="card-link" href="/details">
            <img
              class="card-img-top"
              src="https://www.northeastern.edu/housing/wp-content/uploads/2017/05/WHITE-exterior-02-e1511889474120.jpg"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">White Hall</h5>
              <h6 class="card-subtitle mb-2 text-muted">Rating: 5/5</h6>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary mr-3">
                Bookmark
              </a>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default BuildingCard;
