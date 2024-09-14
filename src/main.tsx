import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import { Users } from "./features/users/users"

const container = document.getElementById("root")

const router = createBrowserRouter([
  {
    path: "",
    element: <Users />, // The Users page component
  },
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
