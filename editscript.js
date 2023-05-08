document.addEventListener("DOMContentLoaded", function () {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const blogId = getQueryParam("id");
  fetch(`http://localhost:8080/get-blog/${blogId}`)
    .then((response) => response.json())
    .then((data) => {
      const titleInput = document.getElementById("title");
      const authorInput = document.getElementById("author");
      const bodyInput = document.getElementById("body");
      console.log(data.data);
      titleInput.value = data.data.title;
      authorInput.value = data.data.author == null ? "" : data.data.author;
      bodyInput.value = data.data.body;
    })
    .catch((error) => {
      console.error("Error fetching blog details:", error);
    });
  function updateBlog(id, title, author, body) {
    const updateData = { title, author, body };
    fetch(`http://localhost:8080/update-blog/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        if (res.ok) alert("Blog updated successfully");
        else throw new Error("Blog update failed");
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        alert("Failed to update the blog");
      });
  }
  const editForm = document.getElementById("editForm");
  editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve the values from the form inputs
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const bodyInput = document.getElementById("body");

    const title = titleInput.value;
    const author = authorInput.value;
    const body = bodyInput.value;

    // Update the blog using the provided data
    updateBlog(blogId, title, author, body);
    window.location.href = "blog.html?id=" + blogId;
  });
});
