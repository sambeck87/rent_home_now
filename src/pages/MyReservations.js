import React from 'react';
import { useSelector } from 'react-redux';
import { getUserReservations } from '../redux/user/userSlice';
import { selectProperties } from '../redux/properties/propertiesSlice';
import '../styles/userPages.css';

const MyReservations = () => {
  const properties = useSelector(selectProperties);
  const reservations = useSelector(getUserReservations);

  if (properties.data.length > 0) {
    return (
      <div>
        <h3 className="text-center my-3">MyReservations</h3>
        <div className="d-flex flex-wrap">
          {reservations.map((reservation) => {
            const property = properties.data.find(
              (property) => property.id === reservation.property_id,
            );

            return (
              <div className="card mb-3 reservation_card mx-auto" key={reservation.id}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img className="reservation_thumb" src={property.images[0] ? property.images[0].source : []} alt={property.name} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      {property && (
                        <h5 className="card-title">
                          Property:&nbsp;
                          {property.name}
                        </h5>
                      )}
                      <br />
                      <span className="card-text">
                        Amount:&nbsp;$
                        {reservation.price}
                        0
                      </span>
                      <br />
                      <span className="card-text">
                        Reserved in:&nbsp;
                        {reservation.created_at.slice(0, 10)}
                      </span>
                      <br />
                      <span className="card-text">
                        Start day:&nbsp;
                        {reservation.start_date}
                      </span>
                      <br />
                      <span className="card-text">
                        Finish day:&nbsp;
                        {reservation.end_date}
                      </span>
                      <br />

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
export default MyReservations;
