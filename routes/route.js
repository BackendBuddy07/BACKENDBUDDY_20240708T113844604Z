const express = require("express");
const router = express.Router();

// auth routes
const { register, login } = require("../controllers/auth");
const { checkAuthorizationHeaders, authorizeUser } = require("../middlewares/authenticate");


router.post("/register", register);
router.post("/login", checkAuthorizationHeaders, login);

    
// Profile routes
const { createProfile, updateProfile, deleteProfile, getProfile, getAllProfile } = require('../controllers/profile');
// 
router.post("/profile/create", checkAuthorizationHeaders,authorizeUser("createProfile") ,createProfile);
router.put("/profile/update/:id", checkAuthorizationHeaders,authorizeUser("updateProfile"), updateProfile);
router.delete("/profile/delete/:id", checkAuthorizationHeaders, authorizeUser("deleteProfile"), deleteProfile);
router.get("/profile/get/:id", checkAuthorizationHeaders, authorizeUser("readProfile"), getProfile);
router.get("/profile/getAll", checkAuthorizationHeaders, authorizeUser("readProfile"), getAllProfile);

  
module.exports = router;
