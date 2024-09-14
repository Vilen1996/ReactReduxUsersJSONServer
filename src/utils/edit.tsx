import { useState } from "react"
import {
  useEditUserMutation,
  useGetUsersQuery,
} from "../features/users/users.api"
import type { InputUser } from "../features/users/types"

export const EditUser = () => {
  const { data: users, isLoading, error } = useGetUsersQuery(null)
  const [editUser] = useEditUserMutation()

  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [userData, setUserData] = useState<InputUser>({
    name: "",
    salary: 0,
  })

  const handleEdit = (id: number) => {
    const user = users?.find(user => user.id === id)
    if (user) {
      setSelectedUser(id)
      setUserData({ name: user.name, salary: user.salary })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedUser !== null) {
      await editUser({ id: selectedUser.toString(), user: userData })
      setSelectedUser(null)
      setUserData({ name: "", salary: 0 })
    }
  }

  return (
    <>
      <h3>Edit User</h3>
      {isLoading && <p>Loading users...</p>}
      {error && <p>Error loading users</p>}
      {users && (
        <div>
          <h4>Select a user to edit</h4>
          {users.map(user => (
            <div key={user.id}>
              <p>
                {user.name} {user.salary} AMD
              </p>
              <button onClick={() => handleEdit(user.id)}>Edit</button>
            </div>
          ))}
        </div>
      )}

      {selectedUser !== null && (
        <form onSubmit={handleSubmit}>
          <h4>Edit Details for User {selectedUser}</h4>
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
          <button type="submit">Save Changes</button>
        </form>
      )}
    </>
  )
}
