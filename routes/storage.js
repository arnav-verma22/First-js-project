const multer = require('multer');

function getProfilePicUpload()
{
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './public/profile_pic');
        }
    })
    return multer({
        storage: storage,
        limits: {
            filedSize: 1048576
        }
    }).single('profile_pic');
}

module.exports = {
    getProfilePicUpload
}