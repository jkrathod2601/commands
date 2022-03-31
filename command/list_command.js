#!/usr/bin/env node

const chalk=require('chalk')

let list_obj={}

list_obj["for showing all command"]="command"
list_obj["for adding a module structure in API folder"]="command-addmodule"
list_obj["for adding a authentication in your project"]="command-addauth"
list_obj["for adding a module middlewAare multer"]="command-addfilemodule"
list_obj["for adding multer globaly"]="command-addfile"



for(let i in list_obj){
    console.log(chalk.blue(i),"------>",chalk.green(list_obj[i]),"\n")
}
