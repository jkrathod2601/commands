#!/usr/bin/env node
/*
    this file is made for authorization techniques and user can select one tech. for suitable for project
*/

const chalk = require("chalk");
const reader = require("readline-sync");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const add_column=[]

const sequelize = new Sequelize(
  process.env.mysql_databse_name, //database name
  process.env.mysql_databse_username, //username
  process.env.mysql_databse_password, //password
  {
    dialect: process.env.databse_dialect, //type of database name
    host: process.env.mysql_databse_host, //host url
  }
);

const queryInterface = sequelize.getQueryInterface();

require("../../database/models/index");

try {
  console.log(chalk.blue("with use of database"), "====>", chalk.yellow("1"));
  console.log(chalk.blue("with use of static"), "====>", chalk.yellow("2"));
  let answer = reader.question(
    chalk.green("which method use for authentication?")
  );

  if (answer == 2) {
    let file_data = fs.readFileSync(
      path.join(__dirname, "../files/auth_static.js"),
      "utf-8"
    );
    fs.writeFileSync(
      path.join(__dirname, "../../core/core_controller.js"),
      file_data
    );
    console.log("successfully added static authentication");
  }

  if (answer == 1) {
    answer = reader.question(
      chalk.green("are you ready to use our database schema yes / no?")
    );
    if (answer == "yes") {
      let user_model = fs.readFileSync(
        path.join(__dirname, "../files/auth_model.js"),
        "utf-8"
      );
      fs.writeFileSync(
        path.join(__dirname, "../../database/models/user_model.js"),
        user_model
      );
      let user_migration = fs.readFileSync(
        path.join(__dirname, "../files/auth_migrations.js"),
        "utf-8"
      );
      fs.writeFileSync(
        path.join(__dirname, "../../database/migrations/user_migration.js"),
        user_migration
      );

      file_data = fs.readFileSync(
        path.join(__dirname, "../files/auth_database.js"),
        "utf-8"
      );
      let model_string = `let modelname = "masterusers";` + file_data;
      fs.writeFileSync(
        path.join(__dirname, "../../core/core_controller.js"),
        model_string
      );

      file_data = fs.readFileSync(
        path.join(__dirname, "../files/passport_setup.js"),
        "utf-8"
      );
      // console.log(file_data)
      fs.writeFileSync(
        path.join(__dirname, "../../core/3rd_authentication/passport_setup.js"),
        file_data
      );

      file_data = fs.readFileSync(
        path.join(__dirname, "../files/auth_social.js"),
        "utf-8"
      );
      let add_string = `let modelname = "masterusers";` + file_data;
      fs.writeFileSync(
        path.join(__dirname, "../../core/3rd_authentication/auth_social.js"),
        add_string
      );

      file_data = fs.readFileSync(
        path.join(__dirname, "../files/checksocialauth.js"),
        "utf-8"
      );
      add_string = `let modelname = "masterusers";` + file_data;
      fs.writeFileSync(
        path.join(__dirname, "../../service/checksocialauth.js"),
        add_string
      );
      console.log(chalk.green("successfully added 3 rd party authentication"));
    }
    if (answer == "no") {
      for (let i in dynamic_db_obj) {
        console.log(chalk.blue(dynamic_db_obj[i]), "====>", chalk.yellow(i));
      }
      let answer = reader.question(
        chalk.green("select one model number for use our authentication")
      );
      let model_name = dynamic_db_obj[answer];
      console.log(chalk.yellow(model_name));

      queryInterface
        .describeTable(dynamic_db_obj[answer])
        .then(async (data) => {
          // console.log(Object.keys(data));
          if (!Object.keys(data).includes("refreshtoken")) {
            await queryInterface
              .addColumn(dynamic_db_obj[answer], "refreshtoken", {
                type: DataTypes.STRING,
              })
              .then((data) => {
                add_column.push({
                  columname: "refreshtoken",
                  type:"DataTypes.STRING"
                })
                console.log(chalk.blue("added refreshtoken column to table"));
              });
          }
          if (!Object.keys(data).includes("key")) {
            await queryInterface
              .addColumn(dynamic_db_obj[answer], "key", {
                type: DataTypes.STRING,
              })
              .then((data) => {
                add_column.push({
                  columname: "key",
                  type:"DataTypes.STRING"
                })
                console.log(chalk.blue("added key column to table"));
              });
          }
          if (!Object.keys(data).includes("id")) {
            await queryInterface
              .addColumn(dynamic_db_obj[answer], "id", {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
              })
              .then((data) => {
                add_column.push({
                  columname: "id",
                  type:"DataTypes.STRING",
                  allowNull: "false",
                  autoIncrement: "true",
                  primaryKey: "true",
                })
                console.log(chalk.blue("added id column to table"));
              })
              .catch((err) => {
                console.log(chalk.red(err));
              });
          }
          if (!Object.keys(data).includes("password")) {
            await queryInterface
              .addColumn(dynamic_db_obj[answer], "password", {
                type: DataTypes.STRING,
              })
              .then((data) => {
                add_column.push({
                  columname: "password",
                  type:"DataTypes.STRING"
                })
                console.log(chalk.blue("added id column to table"));
              });
          }
          if (!Object.keys(data).includes("role")) {
            await queryInterface
              .addColumn(dynamic_db_obj[answer], "role", {
                type: DataTypes.STRING,
              })
              .then((data) => {
                add_column.push({
                  columname: "role",
                  type:"DataTypes.STRING"
                })
                console.log(chalk.blue("added role column to table"));
              });
          }
          if (!Object.keys(data).includes("name")) {
            await queryInterface
              .addColumn(dynamic_db_obj[answer], "name", {
                type: DataTypes.STRING,
              })
              .then((data) => {
                add_column.push({
                  columname: "name",
                  type:"DataTypes.STRING"
                })
                console.log(chalk.blue("added name column to table"));
              });
          }
          if (!Object.keys(data).includes("email")) {
            await queryInterface
              .addColumn(dynamic_db_obj[answer], "email", {
                type: DataTypes.STRING,
              })
              .then((data) => {
                add_column.push({
                  columname: "email",
                  type:"DataTypes.STRING"
                })
                console.log(chalk.blue("added name column to table"));
              });
          }
          file_data = fs.readFileSync(
            path.join(__dirname, "../files/auth_database.js"),
            "utf-8"
          );
          model_string =
            `let modelname = "${dynamic_db_obj[answer]}";` + file_data;
          fs.writeFileSync(
            path.join(__dirname, "../../core/core_controller.js"),
            model_string
          );

          answer = reader.question(
            chalk.green(
              "are you ready to implement a 3rd party authentication? yes/no"
            )
          );

          if (answer == "yes") {
            console.log(
              chalk.yellow(
                `your selected authantication table is ${model_name}`
              )
            );
            console.log(model_name);
            answer = reader.question(
              chalk.green(
                "are you ready to implement a 3rd party authentication in this table? yes/no"
              )
            );
            await queryInterface
              .describeTable(model_name)
              .then(async (data) => {
                if (!Object.keys(data).includes("googleid")) {
                  await queryInterface
                    .addColumn(model_name, "googleid", {
                      type: DataTypes.STRING,
                    })
                    .then((data) => {
                      add_column.push({
                        columname: "googleid",
                        type:"DataTypes.STRING"
                      })
                      console.log(chalk.blue("added googleid column to table"));
                    });
                }
                if (!Object.keys(data).includes("facebookid")) {
                  await queryInterface
                    .addColumn(model_name, "facebookid", {
                      type: DataTypes.STRING,
                    })
                    .then((data) => {
                      add_column.push({
                        columname: "facebookid",
                        type:"DataTypes.STRING"
                      })
                      console.log(
                        chalk.blue("added facebookid column to table")
                      );
                    });
                }
                if (!Object.keys(data).includes("githubid")) {
                  await queryInterface
                    .addColumn(model_name, "githubid", {
                      type: DataTypes.STRING,
                    })
                    .then((data) => {
                      add_column.push({
                        columname: "githubid",
                        type:"DataTypes.STRING"
                      })
                      console.log(
                        chalk.blue("added facebookid column to table")
                      );
                    });
                }
                file_data = fs.readFileSync(
                  path.join(__dirname, "../files/passport_setup.js"),
                  "utf-8"
                );
                // console.log(file_data)
                fs.writeFileSync(
                  path.join(
                    __dirname,
                    "../../core/3rd_authentication/passport_setup.js"
                  ),
                  file_data
                );

                file_data = fs.readFileSync(
                  path.join(__dirname, "../files/auth_social.js"),
                  "utf-8"
                );
                let add_string = `let modelname = "${model_name}";` + file_data;
                fs.writeFileSync(
                  path.join(
                    __dirname,
                    "../../core/3rd_authentication/auth_social.js"
                  ),
                  add_string
                );

                file_data = fs.readFileSync(
                  path.join(__dirname, "../files/checksocialauth.js"),
                  "utf-8"
                );
                add_string = `let modelname = "${model_name}";` + file_data;
                fs.writeFileSync(
                  path.join(__dirname, "../../service/checksocialauth.js"),
                  add_string
                );
                console.log(
                  chalk.green("successfully added 3 rd party authentication")
                );
                console.log(chalk.blue("add this model property to your model file"),chalk.yellow(model_name))
                console.log(add_column)
              
              });
          }
        });
        
    }
  }
} catch (error) {
  console.log(chalk.red(error.message));
}
