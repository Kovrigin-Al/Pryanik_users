import { useContext } from "react";
import { observer } from "mobx-react-lite";

import { UserContext } from "./context";
import TablePage from "./pages/TablePage";
import LoginPage from "./pages/LoginPage";

const App = observer(() => {
    const { isAuth } = useContext(UserContext);
    return isAuth ? <TablePage /> : <LoginPage />;
});

export default App;
