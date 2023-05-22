import React from 'react';
import PropTypes, { number } from 'prop-types';
import { FaFacebookF, FaTiktok } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => (
  <div className="property-card">
    <div className="property-image-back">
      {property.images.length > 0 && (
        <img
          src={property.images[0].source}
          alt={property.name}
          className="property-image"
        />
      )}
    </div>
    <Link
      to={`details/${property.id}`}
      className="property-name fs-3 fw-bold text-dark text-decoration-none"
    >
      {property.name}
    </Link>
    <span className="text-muted text-center p-3">
      ............................
    </span>
    <p className="property-description text-center">
      {property.description.substring(0, 30)}
      ...
    </p>
    <div className="d-flex justify-content-between w-75">
      <h5 title="Total Fee">
        $
        {property.reservation_criteria.rate
          + property.reservation_criteria.others_fee}
      </h5>
      {property.address && (
        <>
          <h5
            title={`State: ${property.address.state}, zip_code: ${property.address.zip_code}`}
          >
            {property.address.country}
          </h5>
        </>
      )}
    </div>
    <div className="property-social text-muted">
      <span className="property-social-icon">
        <FaFacebookF color="gray" />
      </span>
      <span className="property-social-icon">
        <FiTwitter />
      </span>
      <span className="property-social-icon">
        <FaTiktok />
      </span>
    </div>
  </div>
);
PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    no_baths: PropTypes.number,
    no_bedrooms: PropTypes.number,
    no_beds: PropTypes.number,
    description: PropTypes.string,
    reservation_criteria: PropTypes.shape({
      id: PropTypes.number,
      max_guest: PropTypes.number,
      others_fee: PropTypes.number,
      rate: PropTypes.number,
      min_time_period: number,
    }),
    address: PropTypes.shape({
      id: PropTypes.number,
      country: PropTypes.string,
      house_number: PropTypes.string,
      state: PropTypes.string,
      street: PropTypes.string,
      zip_code: PropTypes.string,
    }),
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        source: PropTypes.string,
      }),
    ),
  }).isRequired,
};
export default PropertyCard;
