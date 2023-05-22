import PropTypes from 'prop-types';
import React from 'react';
import { isWithinInterval, format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { toast } from 'react-toastify';

const ReservationDatePicker = ({
  inReserved, range, setRange, minTimePeriod,
}) => {
  const handleSelect = (selectedRange) => {
    if (!selectedRange) {
      setRange([]);
      return;
    }
    const { from, to } = selectedRange;
    if (from && to) {
      const convertedReserved = inReserved.map(({ from, to }) => ({
        start: from,
        end: to,
      }));
      const isDateWithinRange = convertedReserved.some(
        (disabledRange) => isWithinInterval(from, disabledRange)
        || isWithinInterval(to, disabledRange)
        || (from < disabledRange.start && to > disabledRange.end),
      );
      if (isDateWithinRange) {
        toast.error('Try another! its already reserved.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setRange([]);
        return;
      }
    }
    setRange(selectedRange);
  };

  let footer = <p>Please pick the first day.</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}
          –
          {format(range.to, 'PPP')}
        </p>
      );
    }
  }

  return (
    <DayPicker
      mode="range"
      defaultMonth={new Date()}
      min={minTimePeriod > 1 ? minTimePeriod : 2}
      selected={range}
      footer={footer}
      onSelect={handleSelect}
      disabled={inReserved}
    />
  );
};

ReservationDatePicker.propTypes = {
  inReserved: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.instanceOf(Date),
      to: PropTypes.instanceOf(Date),
    }),
  ).isRequired,
  range: PropTypes.shape({
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
  }),
  setRange: PropTypes.func.isRequired,
  minTimePeriod: PropTypes.number,
};

ReservationDatePicker.defaultProps = {
  range: {},
  minTimePeriod: 2,
};

export default ReservationDatePicker;
