const router = require("express").Router();
const savedPostController = require("../controller/savedPostController");
const { verifyToken, verifyRole } = require("../middleware/verifyToken");

router.get("/", verifyToken, savedPostController.getSavedPosts);
router.post("/:id", verifyToken, savedPostController.createSavedPost);
router.delete("/:id", verifyToken, savedPostController.deleteSavedPost);

module.exports = router;