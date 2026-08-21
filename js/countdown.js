/* ==========================================================================
   GICA & VHO — The Ultimate Co-Op Campaign
   countdown.js — live countdown to the wedding day
   Target: 07 February 2027, ceremony at San Antonio de Padua Parish

   Supports multiple countdown groups marked with [data-countdown-group].
   Each group may contain up to four cells marked with
   data-countdown="days|hours|minutes|seconds".
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;

  // All countdown number cells across all groups
  var cells = document.querySelectorAll("[data-countdown]");

  // Bail if no cells exist (e.g. page without a countdown)
  if (!cells.length) { return; }

  // Wedding day: February 7, 2027, 9:00 AM
  var targetDate = new Date("2027-02-07T09:00:00+08:00").getTime();

  function pad(value) {
    return value < 10 ? "0" + value : String(value);
  }

  function update() {
    var diff = targetDate - Date.now();

    // The big day has arrived — show zeros and flag the event.
    if (diff < 0) {
      for (var i = 0; i < cells.length; i++) {
        cells[i].textContent = "00";
      }
      root.dataset.questStarted = "true"; // CSS hook for celebration styling
      return;
    }

    var days = Math.floor(diff / 86400000);
    var hours = Math.floor((diff % 86400000) / 3600000);
    var minutes = Math.floor((diff % 3600000) / 60000);
    var seconds = Math.floor((diff % 60000) / 1000);

    var values = {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds)
    };

    for (var j = 0; j < cells.length; j++) {
      var key = cells[j].getAttribute("data-countdown");
      if (values[key] !== undefined) {
        cells[j].textContent = values[key];
      }
    }
  }

  update();
  setInterval(update, 1000);
})();