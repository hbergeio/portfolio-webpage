document.addEventListener("DOMContentLoaded", () => {
    fetch('https://api.github.com/users/hbergeio/repos?per_page=100')
        .then(response => response.json())
        .then(repos => {
            repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

            const allContainer = document.querySelector('main .projects .all');
            const newestContainer = document.querySelector('main .projects .newest');
            const mostWatchedContainer = document.querySelector('.mostWatched');

            repos.forEach((repo, idx) => {
                const section = document.createElement('section');
                section.className = 'project';
                section.innerHTML = `
                    <h2><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h2>
                    <p>${repo.description || ''}</p>
                    <span>⭐ ${repo.stargazers_count}</span>
                `;
                allContainer && allContainer.appendChild(section);
                if (idx < 5 && newestContainer) {
                    newestContainer.appendChild(section.cloneNode(true));
                }
            });

            // Top 5 by stargazers_count
            const topWatched = [...repos]
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 5);

            if (mostWatchedContainer) {
                topWatched.forEach(repo => {
                    const section = document.createElement('section');
                    section.className = 'project';
                    section.innerHTML = `
                        <h2><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h2>
                        <p>${repo.description || ''}</p>
                        <span>⭐ ${repo.stargazers_count}</span>
                    `;
                    mostWatchedContainer.appendChild(section);
                });
            }
        })
        .catch(console.error);
});
