"use strict";

module.exports = function(program, tnt) {
  program
    .command("trailhead <id>")
    .description("Get trailhead info")
    .option("-g, --geojson", "Output GeoJSON")
    .action(function(id, cmd) {
      return tnt.getTrailhead(id, function(err, trailhead) {
        if (err) {
          console.error(err);
          return;
        }

        switch (true) {
        case cmd.geojson:
          var data = {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [trailhead.longitude, trailhead.latitude]
                },
                properties: trailhead
              }
            ]
          };

          delete data.features[0].properties.latitude;
          delete data.features[0].properties.longitude;

          console.log("%j", data);

          break;

        default:
          console.log("%j", trailhead);
        }
      });
    });
};
