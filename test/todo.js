// Axios
const { default: _axios } = require("axios");
const axios = _axios.create({
  baseURL: "http://localhost:3000",
});
axios.interceptors.response.use((data) => data.data);

// Main
(async () => {
  // Get
  // const response = await axios.get("/todo");

  // Post
  // const response = await axios.post("/todo", { name: "Some todo" });

  // Update
  // const response = await axios.put("/todo", {
  //   id: 1,
  //   name: "Some todo #1",
  //   time: new Date().toISOString(),
  // });

  // Delete
  const response = await axios.delete("/todo/2");

  console.log(response);
})();
