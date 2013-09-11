"use strict";

module.exports = function(program, tnt) {
  program
    .command("trip <id>")
    .description("Get trip info")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(id, cmd) {
      return tnt.getTrip(id, function(err, trip) {
        if (err) {
          console.error(err);
          return;
        }

        switch (true) {
        case cmd.geojson:
          tnt.getTripRoute(id, function(err, route) {
            var data = {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: route
                  },
                  properties: trip
                }
              ]
            };

            console.log("%j", data);
          });

          break;

        default:
          console.log("%j", trip);
        }
      });
    });
};
