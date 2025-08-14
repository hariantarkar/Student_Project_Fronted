
export const saveCourse = async (name) => {
  const response = await fetch("http://localhost:9999/addCourse", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      // Include authorization header if your middleware requires it
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to save course");
  }

  const data = await response.json();
  return data.message;
};
export const getAllCourses = async () => {
  const response = await fetch("http://localhost:9999/viewCourses");
  if (!response.ok) throw new Error("Failed to fetch courses");
  return await response.json();
};

export const updateCourse = async (cid, name) => {
  const response = await fetch("http://localhost:9999/updateCourse", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cid, name })
  });
  if (!response.ok) throw new Error("Failed to update course");
  return await response.json();
};

// export const deleteCourse = async (cid) => {
//   const response = await fetch("http://localhost:9999/deleteCourse", {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ cid })
//   });
//   if (!response.ok) throw new Error("Failed to delete course");
//   return await response.json(); // ✅ parses the { message: "..."} object
// };
export const deleteCourse = async (cid) => {
  const response = await fetch(`http://localhost:9999/deleteCourse/${cid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete course");
  }

//  const data = await response.json();
  alert(data.message); // ✅ show backend success message
  return await response.json();;
};