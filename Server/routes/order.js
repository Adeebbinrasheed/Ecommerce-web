const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const { newOrder, getMyOrder, updateStatus } = require("../controllers/order");
const router = express.Router();

router.route("/new/cod").post(isAuthenticated, newOrder);
router.route("/getOrder/:id").get(isAuthenticated, getMyOrder);
router.route("/getOrder/:id").put(isAuthenticated, updateStatus);

module.exports = router;
