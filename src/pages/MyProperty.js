import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button, Modal } from 'react-bootstrap';
import {
  deleteProperty,
  getPropertiesByUser,
} from '../redux/properties/propertiesSlice';
import ModalComponent from '../components/ModalComponent';
import { getAccessToken, getUser } from '../redux/user/userSlice';

const MyProperty = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties);
  const userAccessToken = useSelector(getAccessToken);
  const user = useSelector(getUser);

  const filteredProperties = properties.data.filter(
    (property) => property.user_id === user.id,
  );

  useEffect(() => {
    const userId = user.id;
    dispatch(getPropertiesByUser(userId));
  }, []);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handleDeleteClick = (property) => {
    setSelectedProperty(property);
  };

  const handleConfirmDelete = () => {
    dispatch(
      deleteProperty({ userAccessToken, propertyId: selectedProperty.id }),
    )
      .then(() => {
        setSelectedProperty(null);
        dispatch(getPropertiesByUser(user.id));
      })
      .catch(() => {});
  };
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <div className="d-flex flex-column m-3">
      <div className="card-deck d-flex flex-wrap">
        {filteredProperties.map((property) => (
          <div className="col card-deck mx-auto" key={property.id}>
            <div className="card mx-auto" style={{ width: '22rem' }}>
              {property.images.length > 0 && (
                <img
                  src={property.images[0] ? property.images[0].source : []}
                  className="card-img-top"
                  alt="..."
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{property.name}</h5>
                <p className="card-text">{property.description}</p>
                <div className="d-flex justify-content-between">
                  <p>
                    Rate: $
                    {property.reservation_criteria.rate}
                  </p>
                  <p>
                    Others Fee: $
                    {property.reservation_criteria.others_fee}
                  </p>
                </div>
                <span>Address</span>
                {property.address && (
                  <p className="d-flex gap-1">
                    <span>
                      {property.address.zip_code}
                      ,
                    </span>
                    <span>
                      {property.address.street}
                      ,
                    </span>
                    <span>{property.address.state}</span>
                  </p>
                )}
                <div className="d-flex gap-3">
                  <button
                    type="button"
                    className="btn btn-primary rounded-circle p-2"
                    onClick={() => setShowEditModal(true)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger rounded-circle p-2"
                    onClick={() => {
                      handleDeleteClick(property);
                    }}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {selectedProperty && (
          <div className="modal-dialog modal-dialog-centered">
            {/* Render your modal component here */}
            <ModalComponent
              property={selectedProperty}
              onConfirmDelete={handleConfirmDelete}
              onClose={() => setSelectedProperty(null)}
            />
          </div>
        )}
        {showEditModal && (
          <Modal show onHide={() => setShowEditModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Update Property</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Coming Soon....</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary">Update</Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
};
export default MyProperty;
