document.addEventListener("DOMContentLoaded", () => {
    // This part is perfect. It starts the whole chain.
    fetch('/api/auth/status')
        .then(res => res.json())
        .then(data => {
            console.log(`Admin status is determined: ${data.isAdmin}`);
            setupUI(data);
        })
        .catch(err => {
            console.error("Couldn't fetch auth status:", err);
            setupUI({ isAdmin: false });
        });
});

function setupUI(authData) {
    const isAdmin = authData.isAdmin;

    fetch('/html/nav.html')
        .then(res => res.text())
        .then(html => {

            document.getElementById('horizontal-nav').innerHTML = html;

            updateAuthUI(authData);

            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll(".nav-link");
            navLinks.forEach(link => {
                const linkHref = link.getAttribute("href").split("/").pop();
                if (linkHref === currentPage) {
                    link.classList.add("active");
                }
            });

            const contextWindow = document.getElementById('timeLineContextMenu');
            const target = document.getElementById('timeline-nav');

            target.addEventListener("contextmenu", (e) => {
                if (isAdmin) {
                    e.preventDefault();
                    contextWindow.style.top = `${e.pageY}px`;
                    contextWindow.style.left = `${e.pageX}px`;
                    contextWindow.classList.remove('hidden');
                }
            });

            document.addEventListener("click", () => {
                contextWindow.classList.add('hidden');
            });

            const contextMenuOptions = document.getElementsByClassName("contextMenuOption");

            Array.from(contextMenuOptions).forEach(opt => {
                if (isAdmin) {
                    opt.addEventListener("click", () => {
                        if (!window.location.pathname.includes("timeline")) {
                            window.location.href = "/html/timeline.html"
                        }
                        console.log("clicked admin option")
                    })
                }
            })

        });
}

function updateAuthUI(authData) {
    const authIcon = document.getElementById('admin-toggle');
    if (!authIcon) {
        console.error("Could not find the auth icon ('admin-toggle')!");
        return;
    }

    if (authData.isAdmin) {
        authIcon.src = '/assets/admin-yellow.svg';
        authIcon.alt = 'Logout';
        authIcon.onclick = () => {
            window.location.href = '/logout';
        };
    } else {
        authIcon.src = '/assets/admin.svg';
        authIcon.alt = 'Login';
        authIcon.onclick = () => {
            window.location.href = '/login';
        };
    }
}