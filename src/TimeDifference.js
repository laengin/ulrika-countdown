import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TimeDifference = (props) => {
  const [timeDifference, setTimeDifference] = useState(
    getTimeDifference(props.targetDateTime)
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimeDifference(getTimeDifference(props.targetDateTime));
    }, 1000);

    return () => clearInterval(timerId);
  }, [props.targetDateTime]);

  function getTimeDifference(target) {
    if (!target || isNaN(new Date(target))) {
      console.error("Ungültiger Zielzeitpunkt:", target);
      return { days: 0, weeks: 0, months: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const now = new Date();
    const targetTime = new Date(target);
    const diffInMs = Math.max(targetTime - now, 0); //Verhindert negative Werte

    const months = calculateMonthDifference(now, targetTime);
    const seconds = Math.floor((diffInMs / 1000) % 60);
    const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
    let hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    hours = hours + (now.getTimezoneOffset() / -60);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    return { days, weeks, months, hours, minutes, seconds };
  }

  function calculateWeekDifference(startDate, endDate) {
    if (
      !(startDate instanceof Date) ||
      !(endDate instanceof Date) ||
      isNaN(startDate) ||
      isNaN(endDate)
    ) {
      console.error("Ungültige Datumsangaben:", startDate, endDate);
      return 0;
    }

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const daysAdjustment = endDate.getDate() >= startDate.getDate() ? 0 : -1; // Korrigiert, wenn im Zielmonat weniger Tage übrig sind

    return years * 12 + months + daysAdjustment;
  }

  function calculateMonthDifference(startDate, endDate) {
    if (
      !(startDate instanceof Date) ||
      !(endDate instanceof Date) ||
      isNaN(startDate) ||
      isNaN(endDate)
    ) {
      console.error("Ungültige Datumsangaben:", startDate, endDate);
      return 0;
    }

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const daysAdjustment = endDate.getDate() >= startDate.getDate() ? 0 : -1; // Korrigiert, wenn im Zielmonat weniger Tage übrig sind

    return years * 12 + months + daysAdjustment;
  }

  if (
    timeDifference.months === 0 &&
    timeDifference.days === 0 &&
    timeDifference.hours === 0
  ) {
    return <div style={{ color: "red" }}>Der Zielzeitpunkt ist erreicht!</div>;
  }

  return (
    <div className="TimeDifference container">
      <div>
        <p>{props.startText}</p>
      </div>
      <div className="row">
          <p>
            {timeDifference.weeks > 0 && `${timeDifference.weeks} Wochen `}
            {timeDifference.days > 0 && `${timeDifference.days % 7} Tage und `}
            {timeDifference.hours.toString().padStart(2, "0")}:
            {timeDifference.minutes.toString().padStart(2, "0")}:
            {timeDifference.seconds.toString().padStart(2, "0")}
          </p>
      </div>
      <div>
      <p>{props.endText}</p>
    </div>
    </div>
  );
};

TimeDifference.propTypes = {
  targetDateTime: PropTypes.string.isRequired, // Muss ein gültiger Datum-String sein
};

export default TimeDifference;
