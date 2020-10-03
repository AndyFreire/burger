const { query } = require("express");
const connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

const orm = {
    // Functions needed:
    // * `selectAll()`
    // * `insertOne()`
    // * `updateOne()`

    selectAll: function(table, cb){
        const query = `SELECT * FROM ${table};`;
        connection.query(query, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, column, values, cb) {
        let query = `INSERT INTO ${table} (${column.toString()}) VALUES (${printQuestionMarks(values.length)})`;

        console.log(query);

        connection.query(query, values, function(err, result){
            if (err) throw err;

            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb) {
        let query = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;

        console.log(query);

        connection.query(query, function(err, result){
            if (err) throw err;

            cb(result);
        });
    }
};

module.exports = orm;