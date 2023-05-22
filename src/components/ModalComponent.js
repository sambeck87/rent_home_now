import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const ModalComponent = ({ property, onConfirmDelete, onClose }) => {
  const handleDelete = () => {
    onConfirmDelete();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete the property
          {' '}
          {property.name}
          ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
ModalComponent.propTypes = {
  property: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalComponent;
