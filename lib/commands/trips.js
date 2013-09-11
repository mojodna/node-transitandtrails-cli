"use strict";

var async = require("async");

var DEFAULT_LIMIT = 50;

module.exports = function(program, tnt) {
  program
    .command("trips")
    .description("List trips")
    .option("-n, --limit <limit>", "Limit the number of results (defaults to 10)")
    .action(function(cmd) {
      var count,
          limit = cmd.limit || 10,
          trips = [],
          offset = 0;

      async.doWhilst(function(callback) {
        return tnt.getTrips({
          limit: Math.min(DEFAULT_LIMIT, limit),
          offset: offset
        }, function(err, data) {
          if (err) {
            return callback(err);
          }

          count = data.length;
          trips = trips.concat(data);
          offset += data.length;

          return callback();
        });
      }, function() {
        return count > 0 && trips.length < limit;
      }, function(err) {
        if (err) {
          throw err;
        }

        trips = trips.slice(0, limit);

        console.log("%j", trips);
      });
    });
};
