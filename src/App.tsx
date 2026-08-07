import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RootComponent } from "./Components/Root"
import { store } from "./Redux/store"
import { BrowserRouter, Route, Routes } from "react-router"

const root = createRoot(document.body)
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<RootComponent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
