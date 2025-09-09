import axios from "axios";

export const getStudents = async () => {
  const response = await fetch("http://localhost:9999/viewAllStudent");
  const result = await response.json();
  return result.data;
};
export const deleteStudent = async (sid) => {
  const response = await fetch(`http://localhost:9999/deleteStudent/${sid}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete student");
  }
  return await response.json();
};
export const getUnregisteredStudents = async () => {
  try {
    const response = await fetch("http://localhost:9999/unregistered-students");
    if (!response.ok) {
      throw new Error("Failed to fetch unregistered students");
    }
    const data = await response.json();
    return data.data; 
  } catch (err) {
    console.error("Error fetching unregistered students:", err);
    throw err;
  }
};

export const getUnregisteredUsers = async () => {
    const res = await fetch("http://localhost:9999/unregistered");
    if (!res.ok) throw new Error("Failed to fetch unregistered users");
    return res.json();
};

export const getApprovedUsers = async () => {
  const response = await fetch("http://localhost:9999/approved");
  if (!response.ok) throw new Error("Failed to fetch approved users");
  return response.json();
};

export const approveUser = async (uid) => {
    const res = await fetch(`http://localhost:9999/approve-user/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
    });
    if (!res.ok) throw new Error("Failed to approve user");
    return res.json();
};

export const addStudent = async (studentData) => {
    const res = await fetch("http://localhost:9999/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData)
    });
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add student");
    }
    return res.json();
};


const API_URL = "http://localhost:9999";

export const updateStudent = async (studentData) => {
  const response = await axios.put(`${API_URL}/students/update`, studentData, {
    withCredentials: true,
  });
  return response.data;
};

export const getStudentById = async (sid) => {
  const response = await fetch(`http://localhost:9999/students/${sid}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  let data = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("No JSON response from backend");
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch student");
  }

  return data; 
};
