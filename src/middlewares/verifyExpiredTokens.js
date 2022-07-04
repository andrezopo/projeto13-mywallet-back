import { db } from "../dbStrategy/mongo.js";

async function verifyExpiredTokens() {
  const now = Date.now();
  const expired = now - 15000 * 60;

  await db.collection("sessions").deleteMany({ time: { $lte: expired } });
}

export default verifyExpiredTokens;
