const { Router } = require("express");
const newsRoute = require("../routes/newsRoutes");
const preferencesRoute = require("../routes/preferencesRoute");
const verifyToken = require("../middlewares/authJWT");
const router = Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});
// router.use(verifyToken);

router.use("/news", newsRoute);
router.use("/preferences", preferencesRoute);

module.exports = router;
