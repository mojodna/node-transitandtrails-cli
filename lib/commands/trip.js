"use strict";

module.exports = function(program, tnt) {
  program
    .command("trip <id>")
    .description("Get trip info")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(id, cmd) {
      switch (true) {
      case cmd.geojson:
        tnt.getTripAsGeoJSON(id, function(err, data) {
          if (err) {
            console.error(err);
            return;
          }

          console.log("%j", data);
        });

        break;

      default:
        tnt.getTrip(id, function(err, trip) {
          if (err) {
            console.error(err);
            return;
          }

          console.log("%j", trip);
        });
      }
    });
};
