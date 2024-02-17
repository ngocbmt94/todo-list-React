const BASE_URL = "http://localhost:9000/tasks";

export const fetchData = async (defaultFiler = "") => {
  let isFilter = "";
  if (defaultFiler && defaultFiler === "completed") isFilter = "isCompleted=true";
  if (defaultFiler && defaultFiler === "unCompleted") isFilter = "isCompleted=false";

  try {
    const res = await fetch(`${BASE_URL}?${isFilter}`);
    if (!res.ok) throw new Error("Something went wrong!");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteTask = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
};

export const postTask = async (task) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await res.json();
    return newTask;
  } catch (err) {
    console.error(err.message);
  }
};

export const puttingRequest = async (id, newTask) => {
  fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
};

export const patchRequest = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const newTask = await res.json();
    return newTask;
  } catch (err) {
    console.error(err.message);
  }
};
