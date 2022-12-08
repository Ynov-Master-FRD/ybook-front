import React, { createContext, ReactElement, useContext, useState } from "react";

//context for global state
// add context for token from AWS Cognito

type GlobalContextType = {
    token : string;

};

const GlobalContext = createContext<GlobalContextType>(null as any);
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{children: ReactElement}> = ({children}) => {
    const [token] = useState<string>("");
    return (
        <GlobalContext.Provider value={{ token }}>
            {children}
        </GlobalContext.Provider>
    );
};
