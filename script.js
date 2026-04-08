const API_KEY = "39939cc66057c7b2ede3d33001365a96";
const URL_API = `https://gnews.io/api/v4/top-headlines?category=general&lang=es&country=mx&max=10&apikey=${API_KEY}`;

const newsArea = document.getElementById("news-area");
const refreshBtn = document.getElementById("refresh-btn");

function fetchNoticias() {
  newsArea.innerHTML =
    '<p class="loading">Cargando noticias, por favor espera...</p>';

  fetch(URL_API)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      newsArea.innerHTML = "";

      if (data.articles && data.articles.length > 0) {
        data.articles.forEach((article) => {
          const div = document.createElement("div");
          div.className = "article";

          const titleHtml = `<h2><a href="${article.url}" target="_blank">${article.title}</a></h2>`;
          const descHtml = `<p>${article.description || "Descripción no disponible en este momento."}</p>`;

          div.innerHTML = titleHtml + descHtml;
          newsArea.appendChild(div);
        });
      } else {
        newsArea.innerHTML =
          "<p>No hay noticias disponibles en este momento.</p>";
      }
    })
    .catch((error) => {
      console.error("Ocurrió un error con el Fetch:", error);
      newsArea.innerHTML = `<p class="error">Lo sentimos, no pudimos cargar las noticias. Intenta de nuevo más tarde.</p>`;
    });
}

fetchNoticias();

refreshBtn.addEventListener("click", fetchNoticias);
