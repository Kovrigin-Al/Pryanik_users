import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import { UserContext } from "./context";
import TablePage from "./pages/TablePage";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./hooks/useAuth";
import LoadingSpinner from "./components/LoadingSpinner";

const App = observer(() => {
    const [isLoading, setIsLoading] = useState(true);
    const { isAuth } = useContext(UserContext);
    const { checkIsLogin } = useAuth();
    useEffect(() => {
        setIsLoading(true);
        checkIsLogin();
        setIsLoading(false);
        return () => {
            setIsLoading(true);
        };
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return isAuth ? <TablePage /> : <LoginPage />;
});

export default App;
