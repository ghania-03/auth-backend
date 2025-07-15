const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/profile/getUserProfileController');
const { updateUsername } = require('../controllers/profile/updateUsernameController');
const { updateProfileImages } = require('../controllers/profile/updateProfileImagesController');
const { changePassword } = require('../controllers/profile/changePasswordController');
const { updateProfileInfo } = require('../controllers/profile/updateProfileInfoController');

const upload = require('../middleware/uploadImages');
const authMiddleware = require('../middleware/auth');

router.get('/profile', authMiddleware, getUserProfile);

router.patch('/username', authMiddleware, updateUsername);

router.patch(
  '/images',
  authMiddleware,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  updateProfileImages
);

router.patch('/change-password', authMiddleware, changePassword);

router.put('/update-profile', authMiddleware, updateProfileInfo);

module.exports = router;