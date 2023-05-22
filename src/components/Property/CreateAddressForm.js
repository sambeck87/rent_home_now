import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createAddress } from '../../redux/address/addressSlice';

const CreateAddressForm = ({ onNext, propertyId }) => {
  const [address, setAddress] = useState({
    house_number: '',
    street: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    property_id: propertyId,
  });
  const toastId = React.useRef(null);
  const loading = useSelector((state) => state.properties.loading);
  const error = useSelector((state) => state.properties.error);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAddress(address))
      .then(() => {
        onNext();
        if (!loading && !error) {
          toastId.current = toast.success(
            'Create Address for property Successfully',
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
          toastId.current = toast.success('creating address ...', {
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
            'Creating Address is not Successfully',
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
      <h2 className="d-flex justify-content-center">Create Address</h2>
      <div className="d-flex mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="House Number"
              type="text"
              className="form-control"
              id="house_number"
              name="house_number"
              value={address.house_number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Street"
              type="text"
              className="form-control"
              id="street"
              name="street"
              value={address.street}
              onChange={handleChange}
            />
          </div>
          <div className="row g-3 mb-2">
            <div className="col-md-6">
              <input
                placeholder="City"
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={address.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                placeholder="State"
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={address.state}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                placeholder="Country"
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={address.country}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                placeholder="ZIP Code"
                type="text"
                className="form-control"
                id="zip_code"
                name="zip_code"
                value={address.zip_code}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Create Address
          </button>
        </form>
      </div>
    </div>
  );
};
CreateAddressForm.propTypes = {
  onNext: PropTypes.func.isRequired,
  propertyId: PropTypes.number.isRequired,
};

export default CreateAddressForm;
