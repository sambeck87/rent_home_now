import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePropertyForm from '../components/Property/CreatePropertyForm';
import CreateAddressForm from '../components/Property/CreateAddressForm';
import CreateReservationCriteriaForm from '../components/Property/CreateReservationCriteriaForm';

const NewProperty = () => {
  const [propertyId, setPropertyId] = useState(null);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setStep(step + 1);
  };

  const onComplete = () => {
    navigate(`/details/${propertyId}`);
  };

  return (
    <div className="d-flex flex-column gap-5">
      {step === 0 && (
        <CreatePropertyForm onNext={handleNext} setPropertyId={setPropertyId} />
      )}
      {step === 1 && (
        <CreateAddressForm onNext={handleNext} propertyId={propertyId} />
      )}
      {step === 2 && (
        <CreateReservationCriteriaForm
          onComplete={onComplete}
          propertyId={propertyId}
        />
      )}
      <div className="progress_bar mx-auto my-3">
        <div
          className="current_progress"
          style={{
            width: `${(step + 1) * 33.3}%`,
          }}
        />
      </div>
    </div>
  );
};

export default NewProperty;
