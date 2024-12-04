import express from "express";
import ProfesoresController from "../controllers/profesoresController.js";

const router = express.Router();

router.get("/", ProfesoresController.consultar);

router.post("/", ProfesoresController.ingresar);

router
  .route("/:id")
  .get(ProfesoresController.consultarDetalle)
  .put(ProfesoresController.actualizar)
  .delete(ProfesoresController.borrar);

export default router;
