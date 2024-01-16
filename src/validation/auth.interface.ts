import Joi from 'joi'
import { IAuth, IValid, ILoginValid } from '../interfaces/auth.interface'

class validateAuth {
  static signup(data: IAuth): IValid {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
      surname: Joi.string().required(),
      password: Joi.string().required(),
      phoneNumber: Joi.string().required(),
    })
    try {
      const res = schema.validate(data)
      if (res.error)
        return {
          status: false,
          msg: res.error.message,
        }
      return {
        status: true,
        msg: 'success',
      }
    } catch ( message ) {
      return { status: false, msg: message }
    }
  }

  static login(data: ILoginValid): IValid {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    })
    try {
      const res = schema.validate(data)
      if (res.error)
        return {
          status: false,
          msg: res.error.message,
        }
      return {
        status: true,
        msg: 'success',
      }
    } catch ( message ) {
      return { status: false, msg: message }
    }
  }
}

export default validateAuth