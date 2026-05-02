import { Router } from "express";
import * as showsController from "../controllers/shows.js";

const router = Router();

router.get("/", showsController.handleGetAllShows);
router.get("/search", showsController.handleSearch);
router.get("/show/:id", showsController.handleGetShowById);
router.get("/episode/:id", showsController.handleGetEpisodeById);

export default router;
