import React, { useState, useEffect } from "react";
import cn from "classnames";
import { connect } from "react-redux";
import queryString from "query-string";
import { Route, Redirect } from "react-router-dom";

import isMobile from "../../../functions/isMobile";
import getDate from "../../../functions/formattedDate";
import getConfirmationCode from "../../../functions/getConfirmationCode";

import setDeliveryCondition from "../../../store/actions/user/setDeliveryCondition";
import addReserve from "../../../store/actions/reserve/addReserve";
import selectAddReserve from "../../../store/selectors/reserve/selectAddReserve";
import checkReserve from "../../../store/actions/reserve/checkReserveAvailability";
import selectCheckReserve from "../../../store/selectors/reserve/selectCheckAvailability";

import Grid from "@material-ui/core/Grid";

import {
  storeOpenTimeRange,
  noFindTableSupport,
  noWaitToBeSeatedSupport,
  reserveOccasions
} from "../../config/store";
import { RESERVATION_OPTIONS_PAGE_TOP_PROMOTION_PROPS } from "../../config/layout";
import {
  RESERVATION_OPTIONS_PAGE_URL,
  RESERVATION_DETAILS_PAGE_URL,
  HOME_PAGE_URL,
  RESERVATION_LIST_PAGE_URL
} from "../../config/routing";

import PageTopPromotion from "../PageTopPromotion";
import AnimatedSwitch from "../AnimatedSwitch";
import Schedule from "../Schedule";
import Details from "./components/Details";
import ScheduleButtons from "./components/ScheduleButtons";
import ConfirmReserveNotification from "../ConfirmReserveNotification";
import ReserveNotAvailableNotification from "../ReserveNotAvailableNotification";

import useReduxCallback from "../../hooks/useReduxCallback";
import useRouter from "../../hooks/useRouter";

function Index(props) {
  const {
    className,
    style,
    history,
    location,
    match,
    staticContext,
    onClose,
    addReserve,
    reserve: { status: reserveStatus, data: reserveData },
    checkReserve,
    setDeliveryCondition,
    check: { status: checkStatus, data: checkData },
    ...others
  } = props;

  const breakpoints = {
    xs: 12,
    sm: 8,
    md: 6,
    lg: 5,
    xl: 5
  };

  const queryParams = queryString.parse(location.search);

  const { matchPath } = useRouter();

  const [notifyConfirmation, setNotifyConfirmation] = useState(false);
  const [notifyNotAvailable, setNotifyNotAvailable] = useState(false);

  const [schedule, setSchedule] = useState(null);
  const [count, setCount] = useState(null);

  useReduxCallback(available, null, checkStatus);
  useReduxCallback(reserved, null, reserveStatus);

  function available() {
    if (checkData.isAvailable) {
      history.push(`/${RESERVATION_DETAILS_PAGE_URL()}`);
    } else {
      setNotifyNotAvailable(true);
    }
  }

  function scheduleDone(data, count) {
    checkReserve({
      count: count,
      schedule: data
    });
    setSchedule(data);
    setCount(count);
  }

  function detailsDone(data) {
    addReserve({
      isWaitlist: isWaitlist,
      note: data.specialRequest,
      count: data.count,
      type: data.occasion,
      schedule: dateTime
    });
  }

  function reserved() {
    setTimeout(() => setNotifyConfirmation(true), 10);
  }

  function handleNotificationDismiss() {
    history.replace(`/${RESERVATION_LIST_PAGE_URL()}`);
  }

  function dineWaitFree() {
    setDeliveryCondition({
      type: "reserve",
      reserve: {
        id: reserveId,
        size: count,
        isWaitlist: isWaitlist
      }
    });
    history.replace(`/${HOME_PAGE_URL()}`);
  }

  const reserveId = reserveData.confirmation;
  const isWaitlist = queryParams.type === "waitlist";
  const reserveConfirmation = reserveId && getConfirmationCode(reserveId);
  const dateTime = getDateTime(schedule, location);
  const isPreScheduled = location.state && location.state.event;

  const optionsBaseUrl = `/${RESERVATION_OPTIONS_PAGE_URL()}`;

  if (noFindTableSupport && noWaitToBeSeatedSupport) {
    return <Redirect to={`/${HOME_PAGE_URL()}`} />;
  }

  if (
    noFindTableSupport &&
    matchPath(location.pathname, { path: optionsBaseUrl, exact: true })
  ) {
    return <Redirect to={`/${RESERVATION_LIST_PAGE_URL()}`} />;
  }

  return (
    <>
      <ConfirmReserveNotification
        open={notifyConfirmation}
        onClose={() => setNotifyConfirmation(false)}
        onDismiss={handleNotificationDismiss}
        onDine={dineWaitFree}
        refrenceCode={reserveConfirmation}
      />
      <ReserveNotAvailableNotification
        open={notifyNotAvailable}
        onClose={() => setNotifyNotAvailable(false)}
        date={schedule && `${schedule.month}/${schedule.day}/${schedule.year}`}
        time={
          schedule && `${schedule.hour}:${schedule.minute} ${schedule.meridiem}`
        }
      />
      <Grid
        className={cn(
          "reservation-options-page-l1",
          { mobile: isMobile },
          className
        )}
        style={{
          ...style
        }}
        justify="center"
        container
        {...others}
      >
        {!isMobile && (
          <PageTopPromotion
            className="promo"
            sortBy="event"
            {...RESERVATION_OPTIONS_PAGE_TOP_PROMOTION_PROPS}
          />
        )}
        <Grid
          className="part-container"
          item
          container
          justify="center"
          {...breakpoints}
        >
          <AnimatedSwitch>
            <Route
              path={`/${RESERVATION_DETAILS_PAGE_URL()}`}
              render={routerProps => (
                <Details
                  date={`${dateTime.weekDay}, ${dateTime.monthName} ${dateTime.day}`}
                  time={`${dateTime.hour}:${dateTime.minute} ${dateTime.meridiem}`}
                  onDone={detailsDone}
                  count={count}
                  occasions={reserveOccasions}
                  showNumberSelect={isWaitlist || isPreScheduled}
                  redirectToBase={!isWaitlist && !isPreScheduled && !schedule}
                  loading={reserveStatus === "pending"}
                  noWaitlist={noWaitToBeSeatedSupport}
                  isMobile={isMobile}
                />
              )}
            />
            <Route
              path={optionsBaseUrl}
              render={routerProps => (
                <Schedule
                  onDone={scheduleDone}
                  buttons={ScheduleButtons}
                  buttonsProps={{
                    breakpoints: breakpoints,
                  }}
                  loading={checkStatus === "pending"}
                  startTime={storeOpenTimeRange.start}
                  endTime={storeOpenTimeRange.end}
                  noTimeLabel="Out of reservation time range"
                  dateTitle="Find your table for any occasion"
                  timeTitle="Choose your party time"
                  basePath={optionsBaseUrl}
                />
              )}
            />
            <Redirect to={`/${RESERVATION_OPTIONS_PAGE_URL()}`} />
          </AnimatedSwitch>
        </Grid>
      </Grid>
    </>
  );
}

const getDateTime = (schedule, location) => {
  if (schedule) {
    return schedule;
  }
  let dateTime;
  if(location.state && location.state.event){
    const event = location.state.event;

    dateTime = {
      ...getDate(new Date(`${event.date} ${event.start}`))
    };
  } else {
    dateTime = getDate(new Date());
  }  
  return dateTime;
};

export default connect(
  state => {
    return {
      reserve: selectAddReserve(state),
      check: selectCheckReserve(state)
    };
  },
  {
    setDeliveryCondition,
    addReserve,
    checkReserve
  }
)(Index);
