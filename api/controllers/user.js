import { db } from "../db.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) {
      console.error(err); 
    return res.status(500).json(err); // ERROR GERAL
    }

    if (data.length === 0) {
    return res.status(404).json("Usuário não encontrado"); //ERROR SOLICITADO

    }  

    return res.status(200).json(data);
  });
};


export const addUser = (req, res) => {
  const q =
    "INSERT INTO usuarios(`nome`, `idade`, `NDPS`, `NDSS`, `professor`, `sala`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.idade,
    req.body.NDPS,
    req.body.NDSS,
    req.body.professor,
    req.body.sala,
  ];

  db.query(q, [values], (err) => {
    if (err){
console.error(err);
    return res.status(500).json(err);
    }    

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const updateUser = (req, res) => {
  const q =
    "UPDATE usuarios SET `nome` = ?, `idade` = ?, `NDPS` = ?, `NDSS` = ?, `professor` = ?, `sala` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.idade,
    req.body.NDPS,
    req.body.NDSS,
    req.body.professor,
    req.body.sala,
  ];

  db.query(q, [...values, req.params.id], (err) => {
     
    if (err) {
console.error(err); 
    return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
    return res.status(404).json("Usuário não encontrado"); 
    }

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
};

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err){
    console.error(err); 
    return res.status(500).json(err); 
  }
  if (result.affectedRows === 0) {
    return res.status(404).json("Usuário não encontrado");
  }

    return res.status(204).json("Usuário deletado com sucesso.");
  });
};