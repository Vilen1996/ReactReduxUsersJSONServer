export interface IUser {
  id: number
  name: string
  salary: number
}

export type InputUser = Omit<IUser, "id">
