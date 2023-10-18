// MyContext.js
import React, { createContext, useState, useContext } from "react";

// create the context
const MyContext = createContext();

// Context Provider
export const MyContextProvider = ({ children }) => {
  // variable to store the user id
  const [myVariable, setMyVariable] = useState("");

  // variable to store the active value
  const [activeVariable, setActiveVariable] = useState("");

  return (
    <MyContext.Provider
      value={{ myVariable, setMyVariable, activeVariable, setActiveVariable }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
