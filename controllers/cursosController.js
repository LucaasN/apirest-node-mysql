import db from "../database/conexion.js";

class CursosController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query(
        `SELECT id, nombre, descripcion, profesor_id FROM cursos.cursos;`,
        (error, rows) => {
          if (error) {
            res.status(400).send(error);
          }
          res.status(200).json(rows);
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  consultarDetalle(req, res) {
    const { id } = req.params;
    try {
      db.query(
        `SELECT id, nombre, descripcion, profesor_id FROM cursos.cursos WHERE id = ?`,
        [id],
        (error, rows) => {
          if (error) {
            res.status(400).send(error);
          }
          res.status(200).json(rows);
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  ingresar(req, res) {
    try {
      const { nombre, descripcion, profesor_id } = req.body;
      db.query(
        `INSERT INTO cursos.cursos
                    (id, nombre, descripcion, profesor_id)
                    VALUES(NULL, ?, ?, ?);`,
        [nombre, descripcion, profesor_id],
        (error, rows) => {
          if (error) {
            res.status(400).send(error);
          }
          res.status(201).json({ id: rows.insertId });
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  actualizar(req, res) {
    const { id } = req.params;
    try {
      const { nombre, descripcion, profesor_id } = req.body;
      db.query(
        `UPDATE cursos.cursos
          SET nombre=?, descripcion=?, profesor_id=?
          WHERE id=?;`,
        [nombre, descripcion, profesor_id, id],
        (error, rows) => {
          if (error) {
            res.status(400).send(error);
          }
          res.status(201).json({ message: "Registro actualizado con exito" });
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  borrar(req, res) {
    const { id } = req.params;
    try {
      db.query(
        `DELETE FROM cursos.cursos WHERE id= ?;`,
        [id],
        (error, rows) => {
          if (error) {
            res.status(400).send(error);
          }
          res.status(200).json({ message: "Registro eliminado con exito" });
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  asociarEstudiante(req, res) {
    try {
      const { curso_id, estudiante_id } = req.body;
      db.query(
        `INSERT INTO cursos.cursos_estudiantes
                    (curso_id, estudiante_id )
                    VALUES(?, ?);`,
        [curso_id, estudiante_id],
        (error, rows) => {
          if (error) {
            res.status(400).send(error);
          }
          res
            .status(201)
            .json({ message: "Estudiante registrado en el curso con exito" });
        }
      );
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

export default new CursosController();
