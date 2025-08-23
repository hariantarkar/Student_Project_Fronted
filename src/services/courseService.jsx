
export const saveCourse = async (name) => {
  const response = await fetch("http://localhost:9999/addCourse", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
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
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch courses");
  return data; 
};

export const updateCourse = async (cid, name) => {
  console.log("hello1");
  const response = await fetch("http://localhost:9999/updateCourse", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cid, name }),
  });
  console.log("hello")
  let data = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("No JSON response from backend");
  }

  if (!response.ok) {
    throw new Error(data.message || "Failed to update course");
  }

  console.log("response from backend:", data);
  return data; 
};


export const deleteCourse = async (cid) => {
  const response = await fetch(`http://localhost:9999/deleteCourse/${cid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const errText = (await response.text().catch(() => "")) || "";
    throw new Error(errText || "Failed to delete course");
  }
  if (response.status === 204) {
    return { message: "Course deleted successfully" };
  }

  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const txt = (await response.text().catch(() => "")) || "";
    return { message: txt || "Course deleted successfully" };
  }

  const data = await response.json().catch(() => ({}));
  return { message: data.message || "Course deleted successfully" };
};
