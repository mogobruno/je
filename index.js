#!/usr/bin/env node

const program = require('commander');
const config = require(__dirname + '/.jsonerc');
const jsonfile = require('jsonfile');

const je = {
  key: function(file, key, value) {
    const json = require(__dirname + "/" + config[file]);
    console.log("Editing: " + __dirname + "/" + config[file]);
    json[key] = value;
    console.log("Setting: { " + key + ": " + value + " }");
    jsonfile.writeFile(__dirname + "/" + config[file], json, function (err) {
      console.error("error:" + err);
    });
  }
}

program
  .arguments('<action> <json...>')
  .version('1.0.0')
  .usage('<action> <json...> [options]')
  .option('-k, --key <key>', 'json key.')
  .option('-v, --value <value>', 'new json value.')
  .action(function(action, json) {
    je[action](json, program.key, program.value)
  })
  .parse(process.argv);
