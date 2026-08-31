// ================= NAVIGATION =================
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    };
}

// Auto year copyright
const currentYear = document.getElementById('currentYear');
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Active navigation item on scroll
const sections = document.querySelectorAll('section');
const navlinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach((sec) => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navlinks.forEach((link) => link.classList.remove('active'));
            const activeLink = document.querySelector(`header nav a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add('active');
        }
    });
});

// ================= GITHUB PROJECTS =================
const GITHUB_USERNAME = 'BryanJth';

// These five remain featured by default. You can also promote any other repo
// by adding the GitHub topic "featured" to it.
const DEFAULT_FEATURED_REPOS = [
    'PDAM-Tariff-Classification',
    'KI-Veritas',
    'Spatial-S.Lag_RF',
    'Database',
    'Spatial-GWR'
];

// Curated titles/descriptions/images for the strongest projects.
// Repository metadata is still loaded automatically from GitHub.
const PROJECT_OVERRIDES = {
    'PDAM-Tariff-Classification': {
        title: 'PDAM Customer Tariff Classification for Audit Prioritization',
        description: 'Cleaned and validated 10,000 PDAM Surabaya customer records, compared Logistic Regression and Random Forest, and achieved a 99.61% Macro F1 score for tariff audit prioritization.',
        image: 'assets/projects/PDAM.png',
        tags: ['Python', 'Classification', 'Machine Learning']
    },
    'KI-Veritas': {
        title: 'Veritas UI Campus Assistant Chatbot',
        description: 'Developed a retrieval-augmented chatbot using a curated PDF knowledge base, embeddings, and Chroma vector search to answer Universitas Indonesia student queries.',
        image: 'assets/projects/Veritas.png',
        tags: ['RAG', 'Python', 'Vector Search']
    },
    'Spatial-S.Lag_RF': {
        title: 'Poverty Determinants in East Java: Spatial & Machine Learning Analysis',
        description: 'Compared OLS, spatial models, and Spatial Random Forest to identify key poverty drivers across 38 districts and cities in East Java.',
        image: 'assets/projects/RFRS.png',
        tags: ['R', 'Spatial Analysis', 'Random Forest']
    },
    'Database': {
        title: 'Sales and Order Management Database System',
        description: 'Designed an SQLite relational database and Python interface for customer, product, order, payment, CRUD, SQL join, and reporting workflows.',
        image: 'assets/projects/Database.png',
        tags: ['SQL', 'SQLite', 'Python']
    },
    'Spatial-GWR': {
        title: 'Poverty Analysis in East Java Using Geographically Weighted Regression (GWR)',
        description: 'Modelled poverty rates using OLS and GWR and visualized local coefficients and residuals to communicate spatial patterns and insights.',
        image: 'assets/projects/GWR.png',
        tags: ['R', 'GWR', 'Spatial Statistics']
    }
};

function getTopics(repo) {
    return Array.isArray(repo.topics) ? repo.topics : [];
}

function formatRepoName(name) {
    return name
        .replace(/[._-]+/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function createTag(text) {
    const span = document.createElement('span');
    span.className = 'project-tag';
    span.textContent = text;
    return span;
}

function createActionLink(label, url, secondary = false) {
    const a = document.createElement('a');
    a.href = url;
    a.className = secondary ? 'btn btn-secondary' : 'btn';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = label;
    return a;
}

function createFeaturedCard(repo) {
    const override = PROJECT_OVERRIDES[repo.name] || {};
    const card = document.createElement('article');
    card.className = 'project-content featured-project-card';

    if (override.image) {
        const img = document.createElement('img');
        img.src = override.image;
        img.alt = `${override.title || formatRepoName(repo.name)} project preview`;
        img.loading = 'lazy';
        card.appendChild(img);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'project-image-placeholder';
        placeholder.innerHTML = '<i class="bx bxl-github"></i>';
        card.appendChild(placeholder);
    }

    const h3 = document.createElement('h3');
    h3.textContent = override.title || formatRepoName(repo.name);
    card.appendChild(h3);

    const description = document.createElement('p');
    description.textContent = override.description || repo.description || 'View this project and its implementation on GitHub.';
    card.appendChild(description);

    const tags = document.createElement('div');
    tags.className = 'project-tags';
    const tagValues = override.tags || [repo.language, ...getTopics(repo).filter((t) => !['featured', 'portfolio', 'portfolio-only', 'hide-from-portfolio'].includes(t))];
    [...new Set(tagValues.filter(Boolean))].slice(0, 4).forEach((tag) => tags.appendChild(createTag(tag)));
    if (tags.childElementCount) card.appendChild(tags);

    const actions = document.createElement('div');
    actions.className = 'btn-box';
    actions.appendChild(createActionLink('View on GitHub', repo.html_url));
    if (repo.homepage && repo.homepage.startsWith('http')) {
        actions.appendChild(createActionLink('Live Demo', repo.homepage, true));
    }
    card.appendChild(actions);

    return card;
}

function createCompactCard(repo) {
    const card = document.createElement('article');
    card.className = 'github-project-card';

    const top = document.createElement('div');
    top.className = 'github-project-top';

    const icon = document.createElement('i');
    icon.className = 'bx bx-code-alt';
    top.appendChild(icon);

    const h3 = document.createElement('h3');
    h3.textContent = formatRepoName(repo.name);
    top.appendChild(h3);
    card.appendChild(top);

    const description = document.createElement('p');
    description.textContent = repo.description || 'Explore the source code and project files on GitHub.';
    card.appendChild(description);

    const meta = document.createElement('div');
    meta.className = 'github-project-meta';
    if (repo.language) meta.appendChild(createTag(repo.language));
    getTopics(repo)
        .filter((topic) => !['featured', 'portfolio', 'portfolio-only', 'hide-from-portfolio'].includes(topic))
        .slice(0, 2)
        .forEach((topic) => meta.appendChild(createTag(topic)));
    card.appendChild(meta);

    const link = document.createElement('a');
    link.href = repo.html_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'github-repo-link';
    link.innerHTML = 'View Repository <i class="bx bx-right-arrow-alt"></i>';
    card.appendChild(link);

    return card;
}

function renderFallbackFeatured(container) {
    container.replaceChildren();
    DEFAULT_FEATURED_REPOS.forEach((name) => {
        const override = PROJECT_OVERRIDES[name] || {};
        container.appendChild(createFeaturedCard({
            name,
            description: override.description || '',
            language: null,
            topics: [],
            html_url: `https://github.com/${GITHUB_USERNAME}/${name}`,
            homepage: ''
        }));
    });
}

async function loadGitHubProjects() {
    const featuredContainer = document.getElementById('featured-projects');
    const moreContainer = document.getElementById('more-projects');

    if (!featuredContainer || !moreContainer) return;

    // Show the curated featured projects immediately, then refresh them with
    // live GitHub metadata when the API response arrives.
    renderFallbackFeatured(featuredContainer);

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&type=owner`,
            { headers: { Accept: 'application/vnd.github+json' } }
        );

        if (!response.ok) {
            throw new Error(`GitHub API returned ${response.status}`);
        }

        const repos = await response.json();

        const eligibleRepos = repos.filter((repo) => {
            const topics = getTopics(repo);
            return !repo.fork &&
                !repo.archived &&
                repo.name !== `${GITHUB_USERNAME}.github.io` &&
                !topics.includes('hide-from-portfolio');
        });

        const featuredRepos = eligibleRepos
            .filter((repo) => {
                const topics = getTopics(repo);
                return !topics.includes('portfolio-only') &&
                    (DEFAULT_FEATURED_REPOS.includes(repo.name) || topics.includes('featured'));
            })
            .sort((a, b) => {
                const ai = DEFAULT_FEATURED_REPOS.indexOf(a.name);
                const bi = DEFAULT_FEATURED_REPOS.indexOf(b.name);
                if (ai !== -1 || bi !== -1) {
                    if (ai === -1) return 1;
                    if (bi === -1) return -1;
                    return ai - bi;
                }
                return new Date(b.updated_at) - new Date(a.updated_at);
            });

        featuredContainer.replaceChildren();
        if (featuredRepos.length) {
            featuredRepos.forEach((repo) => featuredContainer.appendChild(createFeaturedCard(repo)));
        } else {
            renderFallbackFeatured(featuredContainer);
        }

        const featuredNames = new Set(featuredRepos.map((repo) => repo.name));
        const moreRepos = eligibleRepos
            .filter((repo) => !featuredNames.has(repo.name) && !DEFAULT_FEATURED_REPOS.includes(repo.name))
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        moreContainer.replaceChildren();
        if (moreRepos.length) {
            moreRepos.forEach((repo) => moreContainer.appendChild(createCompactCard(repo)));
        } else {
            const empty = document.createElement('p');
            empty.className = 'github-empty-state';
            empty.textContent = 'No additional public repositories are available yet.';
            moreContainer.appendChild(empty);
        }
    } catch (error) {
        console.error('Unable to load GitHub repositories:', error);
        renderFallbackFeatured(featuredContainer);

        moreContainer.innerHTML = '';
        const errorCard = document.createElement('div');
        errorCard.className = 'github-empty-state';
        errorCard.append('GitHub repositories could not be loaded right now. ');
        const profileLink = document.createElement('a');
        profileLink.href = `https://github.com/${GITHUB_USERNAME}`;
        profileLink.target = '_blank';
        profileLink.rel = 'noopener noreferrer';
        profileLink.textContent = 'View my GitHub profile instead.';
        errorCard.appendChild(profileLink);
        moreContainer.appendChild(errorCard);
    }
}

loadGitHubProjects();
