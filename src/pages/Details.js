import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaBed, FaBath } from 'react-icons/fa';
import { MdMeetingRoom } from 'react-icons/md';
import { FiArrowRightCircle } from 'react-icons/fi';
import { getDetails, fullDetails } from '../redux/details/GetDetails';
import '../styles/LoadingSpinner.css';

const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigate('/reservations/new', {
      state: {
        property_id: id,
      },
    });
  };
  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  const filtered = useSelector(fullDetails);

  const [userKey, setUserKey] = useState(null);

  useEffect(() => {
    const storedUserKey = localStorage.getItem('user');
    if (storedUserKey) {
      setUserKey(storedUserKey);
    }
  }, []);

  if (filtered.id >= 0) {
    const imageList = filtered.images.map((image) => (
      <div className="carousel-item active" key={image.id}>
        <img src={image.source} className="d-block w-100 max_height" alt="..." />
      </div>
    ));

    return (
      <div className="d-flex flex-md-row flex-column details_container max_width">
        <div className="bd-example image">
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              {imageList}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        <div className="table_width">
          <div className="ml-3">
            <h1>{filtered.name}</h1>
            <p>{filtered.category.name}</p>
            <p>{filtered.description}</p>
          </div>

          <p>
            <button className="btn text-white lg_button disable primary_bg no_hover" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Address
            </button>
          </p>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              Country:&nbsp;
              {filtered.address.country}
              <br />
              City:&nbsp;
              {filtered.address.city}
              <br />
              State:&nbsp;
              {filtered.address.state}
              <br />
              Street:&nbsp;
              {filtered.address.street}
              {filtered.address.house_number}
              <br />
              ZIP:&nbsp;
              {filtered.address.zip_code}
            </div>
          </div>

          <h5>General Attributes</h5>
          <table className="table table-striped table-hover grey_bg">
            <tbody>
              <tr>
                <th scope="row">
                  <MdMeetingRoom size={20} />
                </th>
                <td>{filtered.no_bedrooms}</td>
              </tr>
              <tr>
                <th scope="row">
                  <FaBath size={20} />
                </th>
                <td>{filtered.no_baths}</td>
              </tr>
              <tr>
                <th scope="row">
                  <FaBed size={20} />
                </th>
                <td>{filtered.no_beds}</td>
              </tr>
            </tbody>
          </table>

          <h5>Reservation Criteria</h5>
          <table className="table table-striped table-hover grey_bg">
            <tbody>
              <tr>
                <th scope="row">Min Time Period</th>
                <td>
                  {filtered.reservation_criteria.min_time_period}
                  &nbsp;
                  {filtered.reservation_criteria.time_period}
                </td>
              </tr>
              <tr>
                <th scope="row">Max. Guests</th>
                <td>{filtered.reservation_criteria.max_guest}</td>
              </tr>
              <tr>
                <th scope="row">Rate</th>
                <td>
                  U$
                  {filtered.reservation_criteria.rate}
                </td>
              </tr>
              <tr>
                <th scope="row">Other Fee</th>
                <td>
                  U$
                  {filtered.reservation_criteria.others_fee}
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          {userKey ? (
            <button id="reserve_btn" className="btn primary_bg text-white lg_button no_hover d-flex justify-content-evenly" type="button" onClick={handleNavigate}>
              Reserve&nbsp;
              <FiArrowRightCircle className="my-auto" />
            </button>
          ) : (
            <p>
              You are not signed in.
              If you want to reserve it. Please &nbsp;
              <Link to="/signin">signed in</Link>
              &nbsp;
              or
              &nbsp;
              <Link to="/signup">signed up</Link>
              &nbsp;
              for create a new account
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner" />
    </div>
  );
};

export default Details;
