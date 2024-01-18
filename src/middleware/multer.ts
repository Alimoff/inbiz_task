import multer from 'multer';

//Multer uses for upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "static/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

export const uploadStorage = multer({ storage: storage })