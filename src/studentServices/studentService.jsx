// api/studentApi.js (or wherever your API calls are)
export const addStudent = async (student) => {
  const response = await fetch("http://localhost:9999/addStudent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add student");
  }

  // ✅ This return is missing in your current code
  return await response.json();
};



export const getStudents = async () => {
  const response = await fetch("http://localhost:9999/viewAllStudent");
  const result = await response.json();
  return result.data; 
};
export const updateStudent = async (student) => {
  const response = await fetch("http://localhost:9999/updateStudent", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error("Failed to update student");
  }
  return await response.json();
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
