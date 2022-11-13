import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppRouter } from "./routes";
import './App.css';

export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
