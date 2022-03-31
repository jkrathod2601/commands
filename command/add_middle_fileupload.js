#!/usr/bin/env node
const chalk = require("chalk");
const reader = require("readline-sync");
const fs = require("fs");
var inquirer = require("inquirer");
const path = require("path");

let module_file=fs.readdirSync(path.join(__dirname,"../../../api"))
let array_fields=[]
let filter_object={}

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
  let selectmodule=await inquirer.prompt([{type: "list",name: "modelis",message: "select model for adding middleware?",choices:module_file}]);
  console.log(selectmodule.modelis)

  let selectmiddlewarename=await inquirer.prompt([{type: "input",name: "filename",message: "enter the middlewarename name"}]);
  let filename=selectmiddlewarename.filename+'.js'
  console.log(filename)

  let f_array=fs.readdirSync(path.join(__dirname,`../../../api/${selectmodule.modelis}/middleware`))

  let public_list=fs.readdirSync=(path.join(__dirname,"../../../public"))

  if (!f_array.includes(selectmodule.modelis)) {

    const foldername = await inquirer.prompt([
      {
        type: "input",
        name: "folderis",
        message: "add a folder name for a file storage",
      },
    ]);

    try{
        fs.mkdirSync(path.join(__dirname,`../../../public/${foldername.folderis}`))
    }catch(err){
      console.log(chalk.red(err))
    }
    

    const data = await inquirer.prompt([
      {
        type: "input",
        name: "numberfiled",
        message: "how many data selection field in your form?",
      },
    ]);
    for (let i = 0; i < data.numberfiled; i++) {
      let nameis = await inquirer.prompt([
        {
          type: "input",
          name: "namefiled",
          message: `enter the name of filed ${i + 1}?`,
        },
      ]);
      let maxcountis = await inquirer.prompt([
        {
          type: "input",
          name: "maxcount",
          message: `enter the maximum file can be upload of file ${i + 1}?`,
        },
      ]);
      array_fields.push({
        name: nameis.namefiled,
        maxCount: maxcountis.maxcount,
      });
      let gaindata = await checkfileapply();
      filter_object[nameis.namefiled] = gaindata;
    }



    let datastring=`const filename="${foldername.folderis}";`+`const file_filter_object=${JSON.stringify(filter_object)};`+
      `const arrayfileds=${JSON.stringify(array_fields)};`
    +fs.readFileSync(path.join(__dirname,"../files/file_upload_module.js"),'utf-8')

    fs.writeFileSync(path.join(__dirname,`../../../api/${selectmodule.modelis}/middleware/${filename}`),datastring)
  } else {
    console.log(chalk.red("file is allready present in middlewAare folder"));
  }
}

run();
