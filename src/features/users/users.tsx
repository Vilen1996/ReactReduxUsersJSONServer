import { useState } from "react"
import { AddUser } from "../../utils/add-user"
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useEditUserMutation,
} from "./users.api"
import type { InputUser } from "./types"

export const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery(null)
  const [deleteUser] = useDeleteUserMutation()
  const [editUser] = useEditUserMutation()

  const [editingUserId, setEditingUserId] = useState<number | null>(null)
  const [userData, setUserData] = useState<InputUser>({ name: "", salary: 0 })

  const handleDelete = (id: number) => {
    deleteUser(id)
  }

  const handleEdit = (id: number, user: InputUser) => {
    setEditingUserId(id)
    setUserData({ name: user.name, salary: user.salary })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent, id: number) => {
    e.preventDefault()
    await editUser({ id: id.toString(), user: userData })
    setEditingUserId(null)
  }

  return (
    <>
      <h3>Users</h3>
      <AddUser />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading users</p>}
      {data && (
        <>
          {data.map(user => (
            <div key={user.id}>
              {editingUserId === user.id ? (
                <form onSubmit={e => handleSubmit(e, user.id)}>
                  <div>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="salary">Salary (AMD):</label>
                    <input
                      type="number"
                      id="salary"
                      name="salary"
                      value={userData.salary}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingUserId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <div>
                  <p>
                    {user.name} {user.salary} AMD
                  </p>
                  <button onClick={() => handleEdit(user.id, user)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </>
  )
}
