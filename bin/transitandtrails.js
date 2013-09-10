#!/usr/bin/env node
"use strict";

var assert = require("assert");

var TransitAndTrails = require("transitandtrails");

var program = require("commander");

// suppress EPIPE errors
process.stdout.on("error", function(err) {
  if (err.code === "EPIPE") {
    process.exit();
  }
});

var tnt = new TransitAndTrails();

program
  .option("-k, --key <key>", "API key")
  .on("key", function(key) {
    tnt.key = key;
  });

require("../lib/commands/trailhead")(program, tnt);
require("../lib/commands/trailhead-attributes")(program, tnt);
require("../lib/commands/trailhead-maps")(program, tnt);
require("../lib/commands/trailhead-photos")(program, tnt);
require("../lib/commands/trailheads")(program, tnt);

try {
  program.parse(process.argv);
} catch (e) {
  if (e instanceof assert.AssertionError) {
    console.error(e.message);
    process.exit(1);
  } else {
    throw e;
  }
}

if (program.args.length === 0) {
  program.help();
}