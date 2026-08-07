import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { RootComponent } from "./Components/Root"
import { store } from "./Redux/store"

const root = createRoot(document.body)
root.render(
  <StrictMode>
    <Provider store={store}>
      <RootComponent />
    </Provider>
  </StrictMode>,
)
