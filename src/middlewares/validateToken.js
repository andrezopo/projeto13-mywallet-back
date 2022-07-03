import { db, ObjectId } from "../dbStrategy/mongo.js";
import jwt from "jsonwebtoken";

async function validateToken(req, res, next) {
  const { id } = req.body;
  const { authorization } = req.headers;

  const token = authorization.replace("Bearer ", "");

  const session = await db.collection("sessions").findOne({ token });

  if (!session || session.id != id) {
    res.status(401).send("Token inválido ou expirado!");
    return;
  }

  const { email } = jwt.verify(token, "André");

  const user = await db.collection("users").findOne({ email });

  if (!user || id != user?._id) {
    res.status(401).send("Não autorizado!");
    return;
  }

  res.locals.email = email;

  next();
}

export default validateToken;
