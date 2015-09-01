var DemoCalendar = function () {
  "use strict";

  
//this tells the component which table rows to create using the data collected from the calendar, in this case dateCell and summaryCell
  function _getRow(event) {
    var fragment = document.createDocumentFragment(),
      tr = document.createElement("tr"),
      dateCell, summaryCell, date;

    if (event.end && event.end.date) {
      // This is an All Day event

      // The API is returning a date range that is one day too many for "All
      // day" events. Set the correct end date.
      event.end.date = moment(event.end.date).add(-1, "days").format("YYYY-MM-DD");

      // for demonstration purposes, just displaying the end date
      date = moment(event.end.date).format("MMMM Do YYYY");
    } else {
      // This is a time based event

      // for demonstration purposes, just displaying the start date/time
      date = moment(event.start.dateTime).format("MMMM Do YYYY, h:mm:ss a");
    }

    //this creates a td element in the table and sets it's inner HTML value to equal the date formed above
    dateCell = document.createElement("td");
    dateCell.innerHTML = date;

    //this creates a td element in the table and sets it's inner HTML value to equal the summary of the event
    summaryCell = document.createElement("td");
    summaryCell.innerHTML = event.summary;

    tr.appendChild(dateCell);
    tr.appendChild(summaryCell);

    fragment.appendChild(tr);

    return fragment;
  }

//this function builds the table from the elements generated above
  function _build(items) {
    var tbody = document.getElementsByTagName("tbody"),
      fragment = document.createDocumentFragment(),
      rows = [],
      row;

    items.forEach(function (item) {
      row = _getRow(item);
      rows.push(row);
    });

    rows.forEach(function (r) {
      fragment.appendChild(r);
    });

    tbody[0].appendChild(fragment);

    
  }

//this function initializes the code above to collect the data from the targeted calendar
  function init() {
    // reference to rise-google-calendar element
    var googleCalendar = document.querySelector("#googleCalendar");

    // register for the "rise-google-calendar-response" event that rise-google-calendar fires
    googleCalendar.addEventListener("rise-google-calendar-response", function(e) {

      // build the Calendar content with the feed data
      _build(e.detail.items);

    });

    // execute making a request for the Google Calendar data
    googleCalendar.go();
  }

  return {
    "init": init
  };
};