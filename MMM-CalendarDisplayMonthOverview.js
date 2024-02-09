Module.register("MMM-CalendarDisplayMonthOverview", {
  defaults: {},

  start() {
    this.events = [];
  },

  notificationReceived(notification, pl) {
    if (notification === "CAL-DISPLAY-EVENTS") {
      console.log(notification, pl);
    }
  },

  getTemplate() {
    return "CalendarDisplayMonthOverview.njk";
  },

  getStyles() {
    return ["CalendarDisplayMonthOverview.css"];
  }
});
