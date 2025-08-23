// api/studentApi.js (or wherever your API calls are)
// export const addStudent = async (student) => {
//   const response = await fetch("http://localhost:9999/addStudent", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(student),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to add student");
//   }

//   // ✅ This return is missing in your current code
//   return await response.json();
// };



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
    return data.data; // return only array part
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

// Approve a user
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
    return res.json(); // contains backend message
};





