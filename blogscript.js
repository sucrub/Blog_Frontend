function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const blogId = getQueryParam("id");

function fetchBlogDetails(id) {
  const blogDetailsDiv = document.getElementById("content");

  fetch(`http://localhost:8080/get-blog/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const blogDetail = document.getElementById("blog-content");
      console.log(data.data);
      const img = document.createElement("img");
      img.src = data.data.image;
      const title = document.createElement("h2");
      title.classList.add("title-showcase");
      const author = document.createElement("h6");
      author.classList.add("author-showcase");
      const body = document.createElement("p");
      body.classList.add("body-showcase");
      const button = document.createElement("a");
      button.classList.add("update-button");
      author.textContent =
        data.data.author == null
          ? "Unknown Writter"
          : `Written by: ${data.data.author}`;
      title.textContent = data.data.title;
      body.textContent =
        data.data.body == null ? "No content :(" : data.data.body;
      button.textContent = "Update";
      button.href = "edit.html?id=" + blogId;
      blogDetail.appendChild(title);
      blogDetail.appendChild(author);
      blogDetail.appendChild(img);
      blogDetail.appendChild(body);
      blogDetail.appendChild(button);
      // them 1 button href den edit.html........
    })
    .catch((error) => {
      console.error("Error fetching blog details:", error);
      blogDetailsDiv.textContent = "Error fetching blog details.";
    });
}

fetchBlogDetails(blogId);
