const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require("../middleware/multer-config");

const stuffCtrl = require("../controllers/stuff");


router.post('/', auth,multer, stuffCtrl.createBook ); 
router.put("/:id",auth,multer, stuffCtrl.modifyBook); 
router.delete ("/:id",auth, stuffCtrl.deleteBook);
router.get("/:id",auth, stuffCtrl.getOneBook);
router.get('/',auth, stuffCtrl.getAllFind);

module.exports = router;