import joi from "joi";

const recordSchema = joi.object({
  id: joi.string(),
  description: joi.string().required(),
  type: joi.string().allow("income", "outcome").required(),
  amount: joi.number().required(),
});

async function validateRecord(req, res, next) {
  const { error } = recordSchema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400).send(error.details.map((err) => err.message));
    return;
  }

  next();
}

export default validateRecord;
