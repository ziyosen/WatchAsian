import { Router } from "express";
import * as controller from "../controllers/shows.js";
import { WELCOME_BANNER } from "../utils/log.js";

const otherRouter = Router();

// Endpoint utama untuk Banner
otherRouter.get("/", (req, res) => {
    res.send(`<pre>${WELCOME_BANNER}</pre>`);
});

// Pastikan semua fungsi ini ada di controllers/shows.js
otherRouter.get("/shows", controller.handleGetAllShows);
otherRouter.get("/show/:id", controller.handleGetShowById);
otherRouter.get("/episode/:id", controller.handleGetEpisodeById);
otherRouter.get("/search", controller.handleSearch);

export default otherRouter;
