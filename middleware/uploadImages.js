const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG/JPG, PNG files are allowed'), false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const isProfile = file.fieldname === 'profileImage';
        cb(null, isProfile ? 'uploads/profile' : 'uploads/cover');
    },
    filename: function (req, file, cb){
        const ext = path.extname(file.originalname);
        const name = file.fieldname + '-' + Date.now() + ext;
        cb(null, name);
    }
});

const upload = multer({
    storage,
    fileFilter,
    limits: {fileSize: 5* 1024 * 1024} //5MB
});

module.exports = upload;