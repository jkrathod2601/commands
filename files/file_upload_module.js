const express= require('express')
const multer=require('multer')
const path=require('path')

console.log("---------------------------------------")

const filestorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    req.filesubmission=true
    cb(null,path.join(__dirname,`../../../public/${filename}`))
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname)
  }
})


const filefilter=(req,file,cb)=>{
if(file_filter_object[file.fieldname].includes(file.mimetype)){
  req.filesubmission=true
  cb(null,true)
}else{
  cb(null,false)
}
}

let ip=multer({storage:filestorage,fileFilter:filefilter})


exports.fileuploadis=ip.fields(arrayfileds)