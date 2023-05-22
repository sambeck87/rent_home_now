import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button, Col, Container, Form, Row,
} from 'react-bootstrap';
import { differenceInDays, format } from 'date-fns';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { fullDetails, getDetails } from '../redux/details/GetDetails';
import { selectPropertiesWithNamesAndIds } from '../redux/properties/propertiesSlice';
import ReservationDatePicker from '../components/ReservationDatePicker';
import PropertyDetailsTable from '../components/PropertyDetailsTable';
import { getAccessToken } from '../redux/user/userSlice';
import {
  addReservation,
  getReservation,
  getReservationError,
  getReservationStatus,
  removeReservation,
} from '../redux/reservation/reservationSlice';
import './style/AddReservation.css';

const AddReservation = () => {
  const toastId = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const properties = useSelector(selectPropertiesWithNamesAndIds);
  const selectedPropertyDetails = useSelector(fullDetails);
  const userAccessToken = useSelector(getAccessToken);
  const reservationStatus = useSelector(getReservationStatus);
  const reservationError = useSelector(getReservationError);
  const reservation = useSelector(getReservation);

  const [selectedProperty, setSelectedProperty] = useState('');
  const [numGuests, setNumGuests] = useState(0);
  const [price, setPrice] = useState(0);
  const [inReserved, setInReserved] = useState([]);
  const [range, setRange] = useState();

  const handlePropertyChange = (e) => {
    if (e.target.value) {
      setSelectedProperty(e.target.value);
      dispatch(getDetails(e.target.value));
    } else {
      setSelectedProperty(e.target.value);
    }
  };
  useEffect(() => {
    if (location?.state?.property_id) {
      setSelectedProperty(location.state.property_id);
    }
  }, [location.state]);

  const handleNumGuestsChange = (e) => {
    setNumGuests(parseInt(e.target.value, 10));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      property_id: selectedProperty,
      start_date: format(new Date(range.from), 'yyyy-MM-dd'),
      end_date: format(new Date(range.to), 'yyyy-MM-dd'),
      guests: numGuests,
    };
    dispatch(addReservation({ userAccessToken, reservationData }));
  };

  useEffect(() => {
    if (!selectedProperty) {
      setInReserved([]);
    }
  }, [selectedProperty]);

  useEffect(() => {
    const differences = differenceInDays(range?.to, range?.from);
    if (differences > 0) {
      const rate = selectedPropertyDetails?.reservation_criteria?.rate || 0;
      const othersFee = selectedPropertyDetails?.reservation_criteria?.others_fee || 0;
      setPrice((differences + 1) * rate + othersFee);
    }
  }, [range, selectedPropertyDetails]);

  // test clock
  useEffect(() => {
    const newReservations = selectedPropertyDetails.reservation?.map(
      (reservation) => ({
        from: new Date(reservation.start_date),
        to: new Date(reservation.end_date),
      }),
    );
    setInReserved(newReservations || []);
  }, [selectedPropertyDetails]);

  if (reservationError && !reservationStatus) {
    toast.update(toastId.current, {
      type: toast.TYPE.ERROR,
      render: reservationError,
    });
    if (reservationError?.start_date) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        render: reservationError.start_date[0],
      });
    }
  }

  if (reservation?.id) {
    toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      render: 'reservation successful',
    });
    dispatch(removeReservation());
    navigate('/');
  }

  if (reservationStatus) {
    toastId.current = toast.info('Sending reservation request!', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'light',
    });
  }

  return (
    <Container className="add_reservation">
      <Row>
        <Col>
          <h1 className="text-center mb-2">Add Reservation</h1>
        </Col>
      </Row>
      <Row>
        <Col
          sm={{ span: 12, order: 'last' }}
          md={{ span: 6, order: 'first' }}
        >
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="property">
              <Form.Label>Property</Form.Label>
              <Form.Control
                as="select"
                value={selectedProperty}
                onChange={handlePropertyChange}
                required
              >
                <option value="">Select a property</option>
                {properties.map((property) => (
                  <option
                    key={property.id}
                    value={property.id}
                  >
                    {property.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label style={{ marginTop: '1rem' }}>
                Select Reservation Period from the calender
              </Form.Label>
              <ReservationDatePicker
                inReserved={inReserved}
                range={range}
                setRange={setRange}
                minTimePeriod={selectedPropertyDetails?.reservation_criteria?.min_time_period}
              />
            </Form.Group>
            <Form.Group controlId="numGuests">
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={selectedPropertyDetails?.reservation_criteria?.max_guest}
                value={numGuests}
                onChange={handleNumGuestsChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Calculated Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                readOnly
              />
            </Form.Group>
            <Button
              type="submit"
              className="mt-2 mb-5"
            >
              Create Reservation
            </Button>
          </Form>
        </Col>
        <PropertyDetailsTable />
      </Row>
    </Container>
  );
};

export default AddReservation;
