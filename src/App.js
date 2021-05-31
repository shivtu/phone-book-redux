import { createStore } from "redux";
import { Provider } from "react-redux";
import Contacts from "./components/Contacts";
import reducer from "./components/reducers/reducers";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Contacts />
    </Provider>
  );
}

export default App;
