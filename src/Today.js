import React, { useState, useEffect } from "react";
import Clock from "./Clock";

const weekday = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
const Today = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Aktualisiere das Datum um Mitternacht
    const updateAtMidnight = () => {
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      );
      const timeUntilMidnight = nextMidnight - now;

      const timeoutId = setTimeout(() => {
        setDate(new Date());
        updateAtMidnight();
      }, timeUntilMidnight);

      return () => clearTimeout(timeoutId); // Cleanup für den Timeout
    };

    updateAtMidnight();
  }, []);

  const formatWeekDay = (date) => {
    return weekday[date.getDay()];
  };
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="Today container">
      <h2>Heute</h2>
      <div className="row">
        <div className="col-md-4">
          <p className="text-md-start">{formatWeekDay(date)}</p>
        </div>
        <div className="col-md-4">
          <p className="text-md-start">{formatDate(date)}</p>
        </div>
        <div className="col-md-4">
          <Clock />
        </div>
      </div>
    </div>
  );
};

export default Today;
