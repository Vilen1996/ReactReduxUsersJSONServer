import { useState } from "react"
import type { InputUser } from "../features/users/types"
import { useAddUserMutation } from "../features/users/users.api"

export const AddUser = () => {
  const [addUser, result] = useAddUserMutation()
  const [user, setUser] = useState<InputUser>({
    name: "",
    salary: 90000,
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addUser(user).then(() => {
      setUser({ name: "", salary: 90000 })
    })
  }
  return (
    <>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user.name}
          onChange={e => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="number"
          value={user.salary}
          onChange={e => setUser({ ...user, salary: +e.target.value })}
        />
        <button>Save</button>
      </form>
    </>
  )
}
