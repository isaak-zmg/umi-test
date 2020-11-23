import React from "react";
import { RootState, IStore } from '@/MSTstores/RootState';



const store = RootState.create({});

export const StoreContext = React.createContext<IStore | null>(store);


export const StoreProvider = ({ children }) => {
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
