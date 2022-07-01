import { db, ObjectId } from "../dbStrategy/mongo.js";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import joi from "joi";

export async function getRecords(req, res) {
  // Fazer um find para pegar todos os registros e aplicar um forEach para atualizar uma variável de soma que representará o saldo.
  // Token de autenticação vêm pelo headers.
}

export async function createRecord(req, res) {
  // Validação do tipo entre nova entrada ou nova saída pelo atributo 'type' do body.
  // Caso nova entrada, registro com valor positivo. Caso nova saída, registro com valor negativo.
  // Inserir todos os registros na mesma collection 'records'.
  // Informações do novo registro vêm por meio do corpo da requisição.
  // Token de autenticação vêm pelo headers.
}

export async function deleteRecord(req, res) {
  // Realizar um método findOne para fazer a deleção do registro do banco de dados.
  // Token de autenticação vem pelo headers.
}

export async function updateRecord(req, res) {
  // Realizar uma atualização de um registro utilizando a função updateOne.
  // Informações da atualização vêm pelo corpo da requisição, token de autenticação vem pelo headers.
}
