const searchForm = document.getElementById("searchForm");

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const keyword = document.getElementById("keyword").value;

  const data = {
    query: keyword
  };

  if (keyword !== "") {
    fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) return response.json();
        return response;
      })
      .then(res => {
        const notFoundElement = document.getElementById("not-found");
        results.innerHTML = "";

        if (res.status === 404) {
          notFoundElement.style.display = "inline-block";
        } else {
          notFoundElement.style.display = "none";

          const results = document.getElementById("results");

          res.forEach(result => {
            results.innerHTML += `
                <div class="result">
                    <div class="title">${result.title}</div>
                    <div><a target="_blank" href="${result.url}">${result.url}</a></div>
                    <div>${result.content}</div>
                </div>
            `;
          });
        }
      })
      .catch(error => {
        console.log("error", error);
      });
  }
});
