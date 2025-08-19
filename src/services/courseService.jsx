
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


// export const getAllCourses = async () => {
//   const response = await fetch("http://localhost:9999/viewCourses");
//   if (!response.ok) throw new Error("Failed to fetch courses");
//   return await response.json();
// };



// export const updateCourse = async (cid, name) => {
//   const response = await fetch("http://localhost:9999/updateCourse", {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ cid, name })
//   });

//   const data = await response.json();  // always parse JSON

//   if (!response.ok) {
//     throw new Error(data.message || "Failed to update course");
//   }

//   return data; // return backend response
// };

// export const deleteCourse = async (cid) => {
//   const response = await fetch(`http://localhost:9999/deleteCourse/${cid}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" }
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || "Failed to delete course");
//   }

// //  const data = await response.json();
//   alert(data.message); // ✅ show backend success message
//   return await response.json();;
// };



// export const saveCourse = async (name) => {
//   const response = await fetch("http://localhost:9999/addCourse", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ name }),
//   });

//   const data = await response.json().catch(() => ({}));
//   if (!response.ok) throw new Error(data.message || "Failed to save course");
//   return data; // e.g. { message: "Course created" }
// };

export const getAllCourses = async () => {
  const response = await fetch("http://localhost:9999/viewCourses");
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch courses");
  return data; // often { data: [...] }
};

export const updateCourse = async (cid, name) => {
  const response = await fetch("http://localhost:9999/updateCourse", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cid, name }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Failed to update course");
  return data; // e.g. { message: "Course updated successfully" }
};

export const deleteCourse = async (cid) => {
  const response = await fetch(`http://localhost:9999/deleteCourse/${cid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Failed to delete course");
  return data; // e.g. { message: "Course deleted successfully" }
};
