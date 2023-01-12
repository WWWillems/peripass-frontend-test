import { useContext } from "react";
import { AppContext, IAppContext } from "./AppContext";

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
const useAppContext = (): IAppContext => {
    const context = useContext<IAppContext>(AppContext);

    if (!context) {
        throw new Error("Context must be used within a Provider");
    }

    return context;
}

export default useAppContext;