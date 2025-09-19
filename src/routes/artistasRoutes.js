import express from "express";
import { createArtista, deleteArtista, getAllArtistas, getByIdArtistas, updateArtista } from "../controllers/artistasController.js";

const router = express.Router();

router.get("/", getAllArtistas);
router.get("/:id", getByIdArtistas);
router.post("/", createArtista);
router.delete("/:id", deleteArtista);
router.put("/:id", updateArtista);

export default router;