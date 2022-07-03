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
  try {
    // Recebe informações por meio do corpo da requisição.
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("E-mail e senha são obrigatórios!");
      return;
    }
    // Verifica se usuário e senha são de um mesmo documento da collection 'users'.
    const user = await db.collection("users").findOne({ email });
    const passwordValidation = bcrypt.compareSync(password, user?.password);
    if (!user || !passwordValidation) {
      res.status(422).send("E-mail e/ou senha inválidos!");
      return;
    }

    // Gera token baseado no nome de usuário utilizando uma string de codificação.
    const token = jwt.sign({ email: user.email }, "André");

    const session = {
      id: ObjectId(user._id),
      token,
    };

    await db
      .collection("sessions")
      .insertOne({ ...session, time: new Date().getTime() });
    // Devolve novo objeto com usuário e token.
    res.status(200).send({ ...session });
  } catch (err) {
    res.status(500).send("Falha ao conectar ao servidor!");
  }
}

export async function signUp(req, res) {
  try {
    // Recebe informações pelo corpo da requisição.
    const user = req.body;
    // Realiza verificação das informações utilizando biblioteca joi.
    const { error } = signUpSchema.validate(user, { abortEarly: false });
    if (error) {
      console.log(error);
      res.status(400).send(error.details.map((err) => err.message));
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

    const encryptedPassword = bcrypt.hashSync(user.password, 12);

    await db.collection("users").insertOne({
      name: user.name,
      email: user.email,
      password: encryptedPassword,
    });

    res.status(200).send("Usuário criado com sucesso!");

    // Insere novo usuário no banco de dados 'users'.
  } catch (err) {
    res.status(500).send("Falha ao conectar ao servidor!");
  }
}

export async function updateToken(req, res) {
  const { id } = req.body;

  const session = await db.collection("sessions").findOne({ id: ObjectId(id) });

  console.log(session);

  await db.collection("sessions").updateOne(
    { id: ObjectId(id) },
    {
      $set: {
        time: Date.now(),
      },
    }
  );
  res.status(200).send();
}
