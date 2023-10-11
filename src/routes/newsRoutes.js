const { Router } = require("express");
const router = Router();
const authJWT = require("../middleware/authJWT");
const { getNews } = require("../controllers/newsController");
