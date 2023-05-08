fetch("http://localhost:8080/get-all-blog")
  .then((res) => res.json())
  .then((data) => {
    const blogList = document.getElementById("blog-list");
    blogList.classList.add("blog-post-list");

    data.data.forEach((blog) => {
      const div = document.createElement("div");
      div.classList.add("blog-block");
      const li = document.createElement("li");
      const title = document.createElement("h3");
      const author = document.createElement("h5");
      title.textContent = blog.title ? blog.title : "No Title";
      author.textContent = `Written by: ${
        blog.author ? blog.author : "Unknown writer"
      }`;
      div.addEventListener("click", () => {
        window.location.href = "blog.html?id=" + blog._id;
      });
      li.appendChild(title);
      li.appendChild(author);
      div.appendChild(li);
      blogList.appendChild(div);
    });
  })
  .catch((error) => {
    console.error(error);
  });
