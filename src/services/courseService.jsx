
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
