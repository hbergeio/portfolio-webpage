let isAdmin = false;

document.addEventListener("DOMContentLoaded", () => {
  // Replace placeholder with nav
  fetch('/html/nav.html')
      .then(res => res.text())
      .then(html => {
          document.getElementById('horizontal-nav').innerHTML = html

          // add styling to active page in nav
          const currentPage = window.location.pathname.split("/").pop() || "index.html";
          const navLinks = document.querySelectorAll(".nav-link");

          navLinks.forEach((link) => {
              const linkHref = link.getAttribute("href").split("/").pop();
              if (linkHref === currentPage) {
                  link.classList.add("active");
              }
          });

      });

  // Check admin status
  fetch('/api/auth/status')
      .then(res => res.json())
      .then(data => {
        isAdmin = data.isAdmin;

        enableAdminFeatures();
      })
      .catch(err => {
        console.error("Couldn't fetch auth status:", err);
        isAdmin = false;
      })
});

function enableAdminFeatures() {

}