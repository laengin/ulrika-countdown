import React from "react";

function DateTime(props) {
  const date = new Date(props.date);
  const weekday = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const month = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const formatWeekDay = (date) => {
    return weekday[date.getDay()];
  };
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="DateTime container">
      <h2>{props.title}</h2>
      <div className="row">
        <div className="col-md-4">
          <p className="text-md-start">{formatWeekDay(date)}</p>
        </div>
        <div className="col-md-4">
          <p className="text-md-start">{formatDate(date)}</p>
        </div>
        <div className="col-md-4">
          <p className="text-md-center">{formatTime(date)}</p>
        </div>
      </div>
    </div>
  );
}
export default DateTime;
