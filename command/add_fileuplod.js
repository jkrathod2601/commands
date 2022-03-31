#!/usr/bin/env node

const chalk = require("chalk");
const reader = require("readline-sync");
const fs = require("fs");
var inquirer = require("inquirer");
const path = require("path");
let array_file = fs.readdirSync(
  path.join(__dirname, "../../../../Node_Js_Cybercom")
);

const checkfileapply = async () => {
  const datais = await inquirer.prompt([
    {
      type: "checkbox",
      name: "array_file_allow",
      message: "select a file you can allow in your system?",
      choices: ["image/jpg", "image/jpeg", "image/png", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/octet-stream", "application/pdf", "application/x-zip-compressed",'application/octet-stream'],
    },
  ]);
  return JSON.stringify(datais.array_file_allow);
};

async function run() {
  const data = await inquirer.prompt([
    {
      type: "list",
      name: "permission",
      message: "are you ready to use this filesystem?",
      choices: ["yes", "no"],
    },
  ]);
  if (data.permission == "yes") {
    const datais = await inquirer.prompt([
      {
        type: "list",
        name: "filename",
        message: "are you ready to use our file system name?",
        choices: ["yes", "no"],
      },
    ]);
    if (datais.filename == "yes") {
      let filestorageobjectstring = 'const filename="savefile";';

      try {
        fs.mkdirSync(path.join(__dirname, "../../../public/savefile"));
      } catch (error) {
        console.log(chalk.red(error))
      }
     
      const strinapply = await checkfileapply();
      let add_file_upload_string = `const allow_file_upload_array= ${strinapply};`;
      let stringdata =
        add_file_upload_string +
        filestorageobjectstring +
        fs.readFileSync(
          path.join(__dirname, "../files/file_upload.js"),
          "utf-8"
        );
      fs.writeFileSync(
        path.join(__dirname, "../../../core/corefileupload.js"),
        stringdata
      );
    } else {
      let answer = reader.question(
        "enter the file name foldername for the storing a files"
      );
      if (!array_file.includes(answer)) {
        fs.mkdirSync(path.join(__dirname, `../../../public/${answer}`));
        filestorageobjectstring = `const filename="${answer}";`;
        const strinapply = await checkfileapply();
        let add_file_upload_string = `const allow_file_upload_array= ${strinapply};`;
        let stringdata =
          add_file_upload_string +
          filestorageobjectstring +
          fs.readFileSync(
            path.join(__dirname, "../files/file_upload.js"),
            "utf-8"
          );
        fs.writeFileSync(
          path.join(__dirname, "../../../core/corefileupload.js"),
          stringdata
        );
      } else {
        console.log(chalk.red("enter a right name"));
      }
    }
  } else {
    console.log("thank you");
  }
}

run();
