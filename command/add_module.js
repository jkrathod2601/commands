#!/usr/bin/env node

const chalk=require('chalk')
const reader = require("readline-sync");
const fs=require("fs");
const path=require("path");

const array_module=fs.readdirSync(path.join(__dirname,"../../../api"))
console.log(array_module)

console.log(chalk.green("enter a name for module"))
let answer = reader.question("==>   ");



if(answer=="" || answer==undefined){
    console.log(chalk.red("Enter a valid name for module"))
}
else if(array_module.includes(answer)){
    console.log("----------------")
    console.log(chalk.red("module is allready present"))
}else{
    let path_module=path.join(__dirname,"../../../",`api/${answer}`)
    fs.mkdirSync(path_module)
    fs.mkdirSync(`${path_module}/controller`)
    fs.mkdirSync(`${path_module}/funcion`)
    fs.mkdirSync(`${path_module}/middleware`)
    fs.mkdirSync(`${path_module}/migrations`)
    fs.mkdirSync(`${path_module}/models`)
    fs.mkdirSync(`${path_module}/seeders`)
    fs.mkdirSync(`${path_module}/service`)
    fs.writeFileSync(`${path_module}/route.json`,`[
        {
            "method": "",
            "path": "",
            "controller": "",
            "middlewares": [],
            "access":[],
            "isgloblal":""
        }
    ]`)
}

