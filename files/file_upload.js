const express= require('express')
const router = new express.Router()
const multer=require('multer')
const path=require('path')

const filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
      req.filesubmission=true
      cb(null,path.join(__dirname,`../public/${filename}`))
    },
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+'-'+Date.now() + '-' + Math.round(Math.random() * 1E9)+file.originalname)
    }
})

const filefilter=(req,file,cb)=>{
  req.filesubmission=true
  if(allow_file_upload_array.includes(file.mimetype)){
    cb(null,true)
  }else{
    cb(null,false)
  }
}

router.use(multer({storage:filestorage,fileFilter:filefilter}).single('file'))



module.exports=router