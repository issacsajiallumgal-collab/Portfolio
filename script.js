/* =============================================
   ISSAC SAJI — PORTFOLIO SCRIPTS
   ============================================= */

(function () {
  'use strict';

  /* ─── NAV: Sticky + Mobile ─── */
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav__links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = burger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = burger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ─── INTERSECTION OBSERVER: Reveal on scroll ─── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .timeline__item, .lang-badge').forEach(el => {
    revealObserver.observe(el);
  });

  /* ─── SKILL CARDS: Staggered reveal + bar fill ─── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach((card, i) => {
          const delay = parseInt(card.dataset.delay || 0);
          setTimeout(() => {
            card.classList.add('revealed');
            // Fill the bar
            const fill = card.querySelector('.skill-card__fill');
            if (fill) {
              const targetWidth = fill.dataset.width || 70;
              setTimeout(() => {
                fill.style.width = targetWidth + '%';
              }, 100);
            }
          }, delay);
        });
        skillObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) skillObserver.observe(skillsSection);

  /* ─── SMOOTH SCROLL for nav anchors ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── ACTIVE NAV LINK on scroll ─── */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = 'var(--accent-color)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── SKILL CARD: Cursor tilt micro-interaction ─── */
  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -5;
      const rotY = ((x - cx) / cx) * 5;
      card.style.transform = `translateY(-6px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── CONTACT CARDS: subtle glow follow ─── */
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(26,107,255,0.08), var(--bg-3) 60%)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  /* ─── HERO: Parallax orbs on mouse move ─── */
  const orb1 = document.querySelector('.hero__orb--1');
  const orb2 = document.querySelector('.hero__orb--2');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    if (orb1) orb1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    if (orb2) orb2.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
  }, { passive: true });

  /* ─── PROJECTS: password-protected editor ─── */
  const PROJECTS_KEY = 'portfolioProjects';
  const PROJECTS_PASSWORD = 'issacsaji@2007';

  const projectManagerBtn = document.getElementById('projectManagerBtn');
  const projectPasswordOverlay = document.getElementById('projectPasswordOverlay');
  const projectPasswordForm = document.getElementById('projectPasswordForm');
  const projectPasswordInput = document.getElementById('projectPasswordInput');
  const projectPasswordCancel = document.getElementById('projectPasswordCancel');
  const projectAdminPanel = document.getElementById('projectAdminPanel');
  const projectAdminClose = document.getElementById('projectAdminClose');
  const projectForm = document.getElementById('projectForm');
  const projectIndexInput = document.getElementById('projectIndex');
  const projectTitleInput = document.getElementById('projectTitle');
  const projectDescriptionInput = document.getElementById('projectDescription');
  const projectLinkInput = document.getElementById('projectLink');
  const projectImageInput = document.getElementById('projectImage');
  const projectResetBtn = document.getElementById('projectResetBtn');
  const projectAdminList = document.getElementById('projectAdminList');
  const projectsGrid = document.getElementById('projectsGrid');

  let projects = [];

  function loadProjects() {
    const defaultProjects = [
      {
        title: 'Gesture-Math',
        description: 'Developed an interactive, computer-vision-based educational game during my internship to make arithmetic learning engaging. Built a real-time hand-tracking pipeline that counts a user\'s raised fingers via webcam to capture numerical inputs and instantly validates whether their math answer is true or false.',
        link: 'https://maheendrahx.github.io/Gesture-Math/',
        image: 'image/gesture-math-logo.svg'
      },
      {
        title: 'Gearshare',
        description: 'Gearshare is a student prototype website designed to simplify peer-to-peer item renting within a college campus. It provides a localized platform where students can easily list, discover, and rent tools, electronics, or academic gear from one another, promoting a sustainable and cost-effective campus sharing economy.',
        link: 'https://gearshare-gold.vercel.app',
        image: 'logo.png'
      }
    ];

    const saved = localStorage.getItem(PROJECTS_KEY);
    if (saved) {
      try {
        const storedProjects = JSON.parse(saved);
        const combined = [...defaultProjects];
        storedProjects.forEach((project) => {
          if (!combined.some((item) => item.title === project.title)) {
            combined.push(project);
          }
        });
        return combined;
      } catch (error) {
        return defaultProjects;
      }
    }
    return defaultProjects;
  }

  function saveProjects() {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }

  function createProjectCard(project) {
    const imageSrc = project.image || 'https://via.placeholder.com/640x360?text=No+image';
    return `
      <article class="project-card">
        <img src="${imageSrc}" alt="${project.title}" />
        <div class="project-card__body">
          <h3 class="project-card__title">${project.title}</h3>
          <p class="project-card__desc">${project.description}</p>
          <a href="${project.link}" class="project-card__link" target="_blank" rel="noopener noreferrer">Visit project</a>
        </div>
      </article>
    `;
  }

  function renderProjects() {
    if (!projects.length) {
      projectsGrid.innerHTML = '<div class="project-placeholder">No projects have been added yet.</div>';
      return;
    }
    projectsGrid.innerHTML = projects.map(createProjectCard).join('');
  }

  function renderAdminList() {
    if (!projects.length) {
      projectAdminList.innerHTML = '<div class="project-placeholder">No saved projects yet. Add one with the form above.</div>';
      return;
    }

    projectAdminList.innerHTML = projects.map((project, index) => `
      <section class="project-admin__item">
        <div class="project-admin__item-header">
          <div>
            <h4 class="project-admin__item-title">${project.title}</h4>
            <div class="project-admin__meta">${project.link}</div>
          </div>
          <div class="project-admin__item-actions">
            <button type="button" class="btn btn--ghost project-edit-btn" data-index="${index}">Edit</button>
            <button type="button" class="btn btn--ghost project-delete-btn" data-index="${index}">Delete</button>
          </div>
        </div>
        <p class="project-admin__meta">${project.description}</p>
        <img class="project-admin__image" src="${project.image || 'https://via.placeholder.com/640x360?text=No+image'}" alt="${project.title}" />
      </section>
    `).join('');
  }

  function resetProjectForm() {
    projectForm.reset();
    projectIndexInput.value = '';
  }

  function openAdminPanel() {
    projectPasswordOverlay.classList.add('hidden');
    projectAdminPanel.classList.remove('hidden');
    resetProjectForm();
    renderAdminList();
  }

  function closeAdminPanel() {
    projectAdminPanel.classList.add('hidden');
  }

  if (projectManagerBtn) {
    projectManagerBtn.addEventListener('click', () => {
      projectPasswordOverlay.classList.remove('hidden');
      projectPasswordInput.focus();
    });
  }

  projectPasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (projectPasswordInput.value.trim() === PROJECTS_PASSWORD) {
      openAdminPanel();
    } else {
      alert('Incorrect password.');
    }
    projectPasswordInput.value = '';
  });

  projectPasswordCancel.addEventListener('click', () => {
    projectPasswordOverlay.classList.add('hidden');
  });

  projectAdminClose.addEventListener('click', closeAdminPanel);

  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = projectTitleInput.value.trim();
    const description = projectDescriptionInput.value.trim();
    const link = projectLinkInput.value.trim();
    const image = projectImageInput.value.trim();

    if (!title || !description || !link || !image) {
      alert('Please complete all fields.');
      return;
    }

    const projectData = { title, description, link, image };
    const editIndex = parseInt(projectIndexInput.value, 10);
    if (!Number.isNaN(editIndex)) {
      projects[editIndex] = projectData;
    } else {
      projects.push(projectData);
    }
    saveProjects();
    renderProjects();
    renderAdminList();
    resetProjectForm();
  });

  projectResetBtn.addEventListener('click', resetProjectForm);

  projectAdminList.addEventListener('click', (event) => {
    const editButton = event.target.closest('.project-edit-btn');
    const deleteButton = event.target.closest('.project-delete-btn');
    if (editButton) {
      const index = Number(editButton.dataset.index);
      const project = projects[index];
      if (!project) return;
      projectIndexInput.value = String(index);
      projectTitleInput.value = project.title;
      projectDescriptionInput.value = project.description;
      projectLinkInput.value = project.link;
      projectImageInput.value = project.image;
      projectTitleInput.focus();
      return;
    }
    if (deleteButton) {
      const index = Number(deleteButton.dataset.index);
      if (!Number.isNaN(index)) {
        projects.splice(index, 1);
        saveProjects();
        renderProjects();
        renderAdminList();
      }
    }
  });

  projects = loadProjects();
  renderProjects();

  /* ─── PAGE LOAD: trigger initial animations ─── */
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

})();
