import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi";
import cors from "cors";
import dotenv from "dotenv";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

const app = express();
app.use([express.json(), cors()]);

let db;

mongoClient.connect().then(() => {
  db = mongoClient.db("my-wallet");
});

app.post("/login", async (req, res) => {
  // Recebe informações por meio do corpo da requisição.
  // Verifica se usuário e senha são de um mesmo documento da collection 'users'.
  // Gera token baseado no nome de usuário utilizando uma string de codificação.
  // Devolve novo objeto com usuário e token.
});

app.post("/signin", async (req, res) => {
  // Recebe informações pelo corpo da requisição.
  // Realiza verificação das informações utilizando biblioteca joi.
  // Confere se usuário ou email já existe no banco de dados 'users'.
  // Insere novo usuário no banco de dados 'users'.
});

app.get("/records", async (req, res) => {
  // Fazer um find para pegar todos os registros e aplicar um forEach para atualizar uma variável de soma que representará o saldo.
  // Token de autenticação vêm pelo headers.
});

app.post("/records", async (req, res) => {
  // Validação do tipo entre nova entrada ou nova saída pelo atributo 'type' do body.
  // Caso nova entrada, registro com valor positivo. Caso nova saída, registro com valor negativo.
  // Inserir todos os registros na mesma collection 'records'.
  // Informações do novo registro vêm por meio do corpo da requisição.
  // Token de autenticação vêm pelo headers.
});

app.delete("/records", async (req, res) => {
  // Realizar um método findOne para fazer a deleção do registro do banco de dados.
  // Token de autenticação vem pelo headers.
});
get;

app.put("/records", async (req, res) => {
  // Realizar uma atualização de um registro utilizando a função updateOne.
  // Informações da atualização vêm pelo corpo da requisição, token de autenticação vem pelo headers.
});

app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta 5000!");
});
