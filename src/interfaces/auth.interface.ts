export interface IAuth {
    email: string
    name: string
    surname: string
    password: string
  }
  
  export interface IValid {
    status: boolean
    msg: string | unknown
  }
  
  export interface ILoginValid {
    email: string
    password: string
  }