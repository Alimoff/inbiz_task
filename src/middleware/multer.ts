import multer from 'multer';

const storage = (destination:any) => multer.diskStorage({
  destination:destination,
  filename: (req,file,cb) =>{
    const imgName = req.body.name
    return cb(null, imgName)
  }
})

export const fileUpload  = (destination:any) =>multer({
 storage:storage(destination),
 limits:{
  fileSize:20*1024*1024,
 },
 fileFilter:(req,file,cb) =>{
  // if(file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg"){
    cb(null,true);
  // }else{
  //   cb(null,false);
  //   return cb(new Error("Only .png, .jpeg, .jpg formats allowed!"));
  // }
 }
}).single('image');