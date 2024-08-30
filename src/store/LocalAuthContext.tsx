import { createContext, PropsWithChildren, useState } from "react";

interface LocalContext{
    token : string;
    setToken : (token: string)=>void
}

export const LocalAuthContext = createContext<LocalContext>({
    token : '',
    setToken : ()=>{}
})


export default function LocalAuthProvider({children}: PropsWithChildren){
    const [token, setToken] = useState('');


const value = {
    token,
    setToken
}

  return (
    <LocalAuthContext.Provider value={value}>{children}</LocalAuthContext.Provider>
  );
};
