Module.register("MMM-CalendarDisplayMonthOverview", {
  defaults: {},

  start() {
    this.events = [];

    this.nunjucksEnvironment().addFilter("toDayNumber", (date) => {
      return new Date(date).getDate();
    });
  },

  notificationReceived(notification, pl) {
    if (notification === "CAL-DISPLAY-EVENTS") {
      let splitArrayIntoSets = (array, setSize) => {
        let sets = [];
        for (let i = 0; i < array.length; i += setSize) {
          sets.push(array.slice(i, i + setSize));
        }
        return sets;
      };

      let segments = splitArrayIntoSets(pl.data, 7);
      let max = Math.max(...segments.flatMap((x) => x.map((e) => e.events)));

      this.today = pl.today;
      this.max = max;
      this.month = new Date(pl.today).toLocaleString("default", {
        month: "long"
      });

      segments = segments.map((seg) =>
        seg.map((eventSegment) => {
          let gradValue = Math.round((eventSegment.events / max) * 100);
          let gradColour =
            eventSegment.events > 0
              ? `hsl(286,${gradValue}%,${60 - gradValue / 3}%)`
              : "";

          return {
            ...eventSegment,
            colour: eventSegment.day !== pl.today ? gradColour : ""
          };
        })
      );

      this.segments = segments;

      this.updateDom(300);
    }
  },

  getTemplate() {
    return "CalendarDisplayMonthOverview.njk";
  },

  getStyles() {
    return ["CalendarDisplayMonthOverview.css"];
  },

  getTemplateData() {
    return {
      segments: this.segments,
      today: this.today,
      max: this.max,
      month: this.month
    };
  }
});
