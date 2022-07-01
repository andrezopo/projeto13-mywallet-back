import { db, ObjectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import joi from "joi";

const signUpSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  confirmPassword: joi.string().min(8).required(),
});

export async function signIn(req, res) {
  // Recebe informações por meio do corpo da requisição.
  // Verifica se usuário e senha são de um mesmo documento da collection 'users'.
  // Gera token baseado no nome de usuário utilizando uma string de codificação.
  // Devolve novo objeto com usuário e token.
}

export async function signUp(req, res) {
  // Recebe informações pelo corpo da requisição.
  const user = req.body;
  // Realiza verificação das informações utilizando biblioteca joi.
  const { error } = signUpSchema.validate(user);
  if (error) {
    console.log("cheguei aqui");
    res.status(400).send(error.details.messages);
    return;
  }
  // Confere se usuário ou email já existe no banco de dados 'users'.
  const newUser = await db.collection("users").findOne({ email: user.email });

  if (newUser) {
    res.status(409).send("E-mail já utilizado!");
    return;
  }

  if (user.password !== user.confirmPassword) {
    res.status(400).send("Erro na confirmação de senha!");
    return;
  }

  const encryptedPassword = bcrypt.hashSync(user.password, 10);

  await db.collection("users").insertOne({
    name: user.name,
    email: user.email,
    password: encryptedPassword,
  });

  res.status(200).send("Usuário criado com sucesso!");

  // Insere novo usuário no banco de dados 'users'.
}
