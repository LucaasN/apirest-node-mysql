import db from "../database/conexion.js";

class ProfesoresController {
  constructor() {}

  consultar(req, res) {
    try {
      db.query(
        `SELECT id, dni, nombre, apellido, email, profesion, telefono FROM profesores`,
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
        `SELECT id, dni, nombre, apellido, email, profesion, telefono FROM cursos.profesores WHERE id = ?`,
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
    const { dni, nombre, apellido, email, profesion, telefono } = req.body;
    try {
      db.query(
        `INSERT INTO cursos.profesores
                  (id, dni, nombre, apellido, email, profesion, telefono)
                  VALUES(NULL, ?, ?, ?, ?, ?, ?);`,
        [dni, nombre, apellido, email, profesion, telefono],
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
      const { dni, nombre, apellido, email, profesion, telefono } = req.body;
      db.query(
        `UPDATE cursos.profesores
          SET dni=?, nombre=?, apellido=?, email=?, profesion=?, telefono=?
          WHERE id=?;`,
        [dni, nombre, apellido, email, profesion, telefono, id],
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
        `DELETE FROM cursos.profesores WHERE id= ?;`,
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

}

export default new ProfesoresController();
