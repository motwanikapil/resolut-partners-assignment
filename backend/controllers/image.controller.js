const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    // Changed from 'fileName' to 'filename'
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    )
  },
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Only .jpeg and .png files are allowed!'), false) // Corrected error handling syntax
  }
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
  fileFilter: fileFilter,
})

exports.uploadImage = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.status(400).json({ message: 'Image upload failed' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    res
      .status(200)
      .json({ message: 'File uploaded successfully', filePath: req.file.path })
  })
}
