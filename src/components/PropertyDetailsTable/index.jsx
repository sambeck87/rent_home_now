import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { fullDetails } from '../../redux/details/GetDetails';

const PropertyDetailsTable = () => {
  const selectedPropertyDetails = useSelector(fullDetails);
  return (
    <Col
      xs={{ span: 12, order: 'first' }}
      sm={{ span: 12, order: 'first' }}
      md={{ span: 6, order: 'last' }}
    >
      {Object.keys(selectedPropertyDetails).length !== 0 ? (
        <table>
          <tbody>
            <tr>
              <th>Title:</th>
              <td>{selectedPropertyDetails.name}</td>
            </tr>
            <tr>
              <th>Area:</th>
              <td>{selectedPropertyDetails.area.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Category:</th>
              <td>{selectedPropertyDetails.category.name}</td>
            </tr>
            <tr>
              <th>Beds:</th>
              <td>{selectedPropertyDetails.no_beds}</td>
            </tr>
            <tr>
              <th>Bedrooms:</th>
              <td>{selectedPropertyDetails.no_bedrooms}</td>
            </tr>
            <tr>
              <th>Baths:</th>
              <td>{selectedPropertyDetails.no_baths}</td>
            </tr>
            <tr>
              <th>Max Guests:</th>
              <td>{selectedPropertyDetails.reservation_criteria.max_guest}</td>
            </tr>
            <tr>
              <th>Rate:</th>
              <td>{selectedPropertyDetails.reservation_criteria.rate}</td>
            </tr>
            <tr>
              <th>Extra Fee:</th>
              <td>{selectedPropertyDetails.reservation_criteria.others_fee}</td>
            </tr>
            <tr>
              <th>Minimum reserved days:</th>
              <td>{selectedPropertyDetails.reservation_criteria.min_time_period}</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>
                {selectedPropertyDetails.address.house_number}
                {selectedPropertyDetails.address.street}
                {selectedPropertyDetails.address.city}
                {selectedPropertyDetails.address.state}
                {selectedPropertyDetails.address.zip_code}
                {selectedPropertyDetails.address.country}
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h4 className="text-center text-warning">
          Select a property to show details
        </h4>
      )}
    </Col>
  );
};

export default PropertyDetailsTable;
