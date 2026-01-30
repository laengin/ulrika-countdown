import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TimeDifference = props => {
  const [timeDifference, setTimeDifference] = useState(getTimeDifference(props.targetDateTime));

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
    /*
    const months = calculateMonthDifference(now, targetTime);
    const seconds = Math.floor((diffInMs / 1000) % 60);
    const minutes = Math.floor((diffInMs / (1000 * 60)) % 60);
    let hours = Math.floor((diffInMs / (1000 * 60 * 60)) % 24);
    hours = hours + (now.getTimezoneOffset() / -60);
    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
*/
    const months = calculateDateDifference(now, targetTime).months;
    const years = calculateDateDifference(now, targetTime).years;
    const seconds = calculateDateDifference(now, targetTime).seconds;
    const minutes = calculateDateDifference(now, targetTime).minutes;
    const hours = calculateDateDifference(now, targetTime).hours;
    const days = calculateDateDifference(now, targetTime).days;
    // const weeks = Math.floor(days / 7);
    const weeks = calculateDateDifference(now, targetTime).weeks;

    return { days, weeks, months, years, hours, minutes, seconds };
  }

  function calculateDateDifference(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Zeitdifferenz in Millisekunden
    // const diffInMs = end - start;

    // Monate berechnen
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    if (end.getDate() <= start.getDate()) {
      months--; // Korrigieren, wenn der Tag im Enddatum kleiner ist
    }

    // Jahre berechnen
    const years = Math.floor(months / 12);
    months = months % 12;

    // Now Adjust startdate to calculate the weeks and days
    let newStart = new Date(start);
    if (start.getMonth() + months > 11) {
      newStart.setFullYear(start.getFullYear() + 1, start.getMonth() + months - 12);
    } else {
      newStart.setFullYear(start.getFullYear(), start.getMonth() + months);
    }
    /*
    newStart.setHours(0);
    newStart.setMinutes(0);
    newStart.setSeconds(0);
    newStart.setMilliseconds(0);
        */
    // console.log(newStart);

    const adjDiffInMs = Math.max(end - newStart, 0); //Verhindert negative Werte

    //  Rest Tage berechnen
    // const days = diffInMs / (1000 * 60 * 60 * 24);
    const days = Math.floor(adjDiffInMs / (1000 * 60 * 60 * 24));
    // console.log(days);
    // restliche Wochen berechnen
    const weeks = Math.floor(days / 7);
    // console.log(weeks);
    // restliche Zeit berechnen
    const seconds = Math.floor((adjDiffInMs / 1000) % 60);
    const minutes = Math.floor((adjDiffInMs / (1000 * 60)) % 60);
    const hours = Math.floor((adjDiffInMs / (1000 * 60 * 60)) % 24);
    // console.log(newStart.getTimezoneOffset());
    // hours = Math.floor(hours + (start.getTimezoneOffset() / -60));

    return {
      days: days,
      weeks: weeks,
      months: months,
      years: years,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
  function calculateWeekDifference(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date) || isNaN(startDate) || isNaN(endDate)) {
      console.error("Ungültige Datumsangaben:", startDate, endDate);
      return 0;
    }

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const daysAdjustment = endDate.getDate() >= startDate.getDate() ? 0 : -1; // Korrigiert, wenn im Zielmonat weniger Tage übrig sind

    return years * 12 + months + daysAdjustment;
  }

  function calculateMonthDifference(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date) || isNaN(startDate) || isNaN(endDate)) {
      console.error("Ungültige Datumsangaben:", startDate, endDate);
      return 0;
    }

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();
    const daysAdjustment = endDate.getDate() >= startDate.getDate() ? 0 : -1; // Korrigiert, wenn im Zielmonat weniger Tage übrig sind

    return years * 12 + months + daysAdjustment;
  }

  if (timeDifference.months === 0 && timeDifference.days === 0 && timeDifference.hours === 0) {
    return <div style={{ color: "red" }}>Der Zielzeitpunkt ist erreicht!</div>;
  }
  const strMonat = timeDifference.months === 1 ? "Monat" : "Monate";
  const strWeek = timeDifference.weeks === 1 ? "Woche" : "Wochen";
  const strYear = timeDifference.years === 1 ? "Jahr" : "Jahre";
  const strDay = timeDifference.days % 7 === 1 ? "Tag" : "Tage";
  return (
    <div className="TimeDifference container">
      <p>{props.startText}</p>
      <div className="row">
        <div className="ClockFontSize">
          {timeDifference.years > 0 && `${timeDifference.years} ${strYear}`}
          {timeDifference.months > 0 && `${timeDifference.months} ${strMonat}`} <br />
          {timeDifference.weeks > 0 && `${timeDifference.weeks} ${strWeek}`} <br />
          {timeDifference.days > 0 && `${timeDifference.days % 7} ${strDay} und `}
          <br />
          {timeDifference.hours.toString().padStart(2, "0")} h : {timeDifference.minutes.toString().padStart(2, "0")} m : {timeDifference.seconds.toString().padStart(2, "0")} s
        </div>
      </div>
      <div>
        <p>{props.endText}</p>
      </div>
    </div>
  );
};

TimeDifference.propTypes = {
  targetDateTime: PropTypes.string.isRequired // Muss ein gültiger Datum-String sein
};

export default TimeDifference;
