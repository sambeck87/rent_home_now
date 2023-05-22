import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { createReservationCriteria } from '../../redux/properties/reservationCriteriaSlice';

const CreateReservationCriteriaForm = ({ onComplete, propertyId }) => {
  const [reservationCriteria, setReservationCriteria] = useState({
    time_period: '',
    others_fee: 0,
    min_time_period: 0,
    max_guest: 0,
    rate: 0,
    property_id: propertyId,
  });

  const toastId = React.useRef(null);
  const loading = useSelector((state) => state.properties.loading);
  const error = useSelector((state) => state.properties.error);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationCriteria((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createReservationCriteria(reservationCriteria))
      .then(() => {
        onComplete();
        if (!loading && !error) {
          toastId.current = toast.success(
            'Create reservation criteria for property Successfully',
            {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              theme: 'light',
            },
          );
        }
        if (loading) {
          toastId.current = toast.success('creating ...', {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            theme: 'light',
          });
        }
      })
      .catch((error) => {
        if (error) {
          toastId.current = toast.error(
            'Creating reservation criteria is not Successfully',
            {
              position: 'top-right',
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              theme: 'light',
            },
          );
        }
      });
  };

  return (
    <div className="d-flex flex-column m-2">
      <h2 className="d-flex justify-content-center">
        Create Reservation Criteria
      </h2>
      <div className="d-flex mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <select
              className="form-select"
              id="time_period"
              name="time_period"
              value={reservationCriteria.time_period}
              onChange={handleChange}
            >
              <option value="">Select a Time Period</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="others_fee" className="form-label w-100">
              Others Fee
              <input
                type="number"
                className="form-control"
                id="others_fee"
                name="others_fee"
                value={reservationCriteria.others_fee}
                onChange={handleChange}
                required
                min={0}
              />
            </label>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="min_time_period" className="form-label w-100">
                Minimum Time Period
                <input
                  type="number"
                  className="form-control"
                  id="min_time_period"
                  name="min_time_period"
                  value={reservationCriteria.min_time_period}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="col-md-6">
              <label htmlFor="max_guest" className="form-label w-100">
                Maximum Guest
                <input
                  type="number"
                  className="form-control"
                  id="max_guest"
                  name="max_guest"
                  value={reservationCriteria.max_guest}
                  onChange={handleChange}
                  required
                  min={0}
                />
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="rate" className="form-label w-100">
              Rate
              <input
                type="number"
                className="form-control"
                id="rate"
                name="rate"
                value={reservationCriteria.rate}
                onChange={handleChange}
                required
                min={0}
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Reservation Criteria
          </button>
        </form>
      </div>
    </div>
  );
};
CreateReservationCriteriaForm.propTypes = {
  onComplete: PropTypes.func.isRequired,
  propertyId: PropTypes.number.isRequired,
};

export default CreateReservationCriteriaForm;
