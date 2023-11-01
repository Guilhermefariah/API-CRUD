import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: recuperar uma lista de usuários
 *     description: Recupera uma lista de usuários do banco de dados.
 *     respostas:
 *       200:
 *         descrição: Uma lista de usuários.
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Adicionar um novo usuário
 *     description: Adicione um novo usuário ao banco de dados.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Defina aqui as propriedades do corpo da sua solicitação
 *             example:
 *               // Forneça um exemplo do corpo da solicitação
 *     respostas:
 *       201:
 *         description: O usuário criado.
 */
router.post("/", addUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar um usuário por ID
 *     description: Atualize as informações de um usuário pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do usuário a ser atualizado.
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Defina aqui as propriedades do corpo da sua solicitação
 *             example:
 *               // Forneça um exemplo do corpo da solicitação
 *     respostas:
 *       200:
 *         description: O usuário atualizado.
 */
router.put("/:id", updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Excluir um usuário por ID
 *     description: Exclui um usuário do banco de dados pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: O ID do usuário a ser excluído.
 *         schema:
 *           type: integer
 *     respostas:
 *       204:
 *         description: Usuário excluído com sucesso.
 */
router.delete("/:id", deleteUser);

export default router;
