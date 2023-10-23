import { Sequelize, INTEGER, STRING, FLOAT } from 'sequelize'
import { z } from 'zod'

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: { ssl: true },
  logging: false
})

sequelize.define('quote', {
  id: { type: INTEGER, autoIncrement: true, primaryKey: true },
  company: { type: STRING },
  rate: { type: FLOAT }
})

export const ZodCreateQuoteSchema = z.object({
  name: z.string().min(3).max(50),
  age: z.coerce.number().nonnegative(),
  model: z.string().min(3),
  yearOfModel: z.coerce.number().nonnegative()
})
