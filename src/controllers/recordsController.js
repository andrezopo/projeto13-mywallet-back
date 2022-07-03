import { db, ObjectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";

export async function getRecords(req, res) {
  let recordsSum = 0;
  // Fazer um find para pegar todos os registros e aplicar um forEach para atualizar uma variável de soma que representará o saldo.
  const records = await db.collection("records").find({}).toArray();
  records.forEach((record) => {
    if (record.type === "income") {
      recordsSum += parseFloat(record.amount);
      return;
    } else {
      recordsSum -= parseFloat(record.amount);
      return;
    }
  });
  res.status(200).send({ records, recordsSum });
  // Token de autenticação vêm pelo headers.
}

export async function createRecord(req, res) {
  try {
    const { description, amount, type } = req.body;
    // Validação do tipo entre nova entrada ou nova saída pelo atributo 'type' do body.
    const record = await db.collection("records").insertOne({
      description,
      type,
      amount: amount.toString().replace("-", ""),
      date: dayjs().format("DD/MM"),
    });
    res.status(201).send({ recordId: record.insertedId });
  } catch (err) {
    res.status(500).send("Falha ao conectar ao servidor!");
  }
}

export async function deleteRecord(req, res) {
  try {
    const { recordId } = req.body;
    await db.collection("records").deleteOne({ _id: ObjectId(recordId) });
    res.status(200).send("Ok!");
  } catch (err) {
    res.status(500).send("Falha ao conectar ao servidor!");
  }
}

export async function updateRecord(req, res) {
  // Realizar uma atualização de um registro utilizando a função updateOne.
  // Informações da atualização vêm pelo corpo da requisição, token de autenticação vem pelo headers.
}
