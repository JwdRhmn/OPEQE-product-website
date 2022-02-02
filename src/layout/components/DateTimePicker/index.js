import React from "react";
import cn from "classnames";

import Grid from "@material-ui/core/Grid";

import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";
import MobileTimePicker from "../MobileTimePicker";

import formattedDate from "../../../functions/formattedDate";
import isMobile from "../../../functions/isMobile";

export default props => {
  const {
    className,
    style,
    onDate,
    onTime,
    timePickerProps = {},
    datePickerProps = {},
    date,
    time,
    timeTitle,
    dateTitle,
    noTimeLabel,
    events,
    only,
    ...others
  } = props;

  const handleDateChange = date => {
    if (onDate) {
      onDate(date);
    }
  };

  const handleTimeSelect = newTime => {
    if (onTime) {
      onTime(newTime);
    }
  };

  const dateFormatted = formattedDate(date);

  return (
    <Grid
      className={cn(
        "date-time-picker-l1", 
        {"mobile": isMobile},
        className
      )}
      style={{
        ...style
      }}
      container
      justify="center"
      alignItems="flex-end"
      {...others}
    >
      {only === "both" ? (
        <>
          <div className="date-container">
            <div className="date-title">
              {dateTitle}
            </div>
            <DatePicker
              className="date-picker"
              pickerProps={{
                value: date,
                onChange: handleDateChange
              }}
              events={events}
              {...datePickerProps}
            />
          </div>
          <div className="time-container">
            <div className="time-title">
              {timeTitle}
            </div>
            <TimePicker
              className="time-picker"
              onSelect={handleTimeSelect}
              selected={time}
              noTimeLabel={noTimeLabel}
              {...timePickerProps}
            />
          </div>
        </>
      ) : only === "date" ? (
        <div className="date-container">
          <DatePicker
            className="date-picker"
            pickerProps={{
              value: date,
              onChange: handleDateChange
            }}
            events={events}
            {...datePickerProps}
          />
        </div>
      ) : (
        <MobileTimePicker
          onSelect={handleTimeSelect}
          selected={time}
          noTimeLabel={noTimeLabel}
          day={parseInt(dateFormatted.day)}
          month={dateFormatted.monthName}
          weekDay={dateFormatted.weekDay}
          {...timePickerProps}
        />
      )}
    </Grid>
  );
};
