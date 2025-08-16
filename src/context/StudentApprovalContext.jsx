import React, { createContext, useState } from "react";

// Create the context
export const StudentApprovalContext = createContext();

// Create the provider component
export const StudentApprovalProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  return (
    <StudentApprovalContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentApprovalContext.Provider>
  );
};