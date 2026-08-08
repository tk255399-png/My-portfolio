/* ==========================================================================
   THARANI K - SHOWCASE MODULE
   Portfolio category filtering and Project Detail Pop-up Modal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Project Details Database - Tharani's GitHub Repositories (tk255399-png)
  const projectsData = [
    {
      id: '01',
      title: 'Online Exam Portal',
      category: 'projects',
      categoryTag: 'Projects',
      image: 'assets/images/project_online_exam.jpg',
      description: 'Comprehensive online examination & assessment web portal featuring automated test grading, student portal dashboard, and real-time exam countdown timer.',
      tech: 'HTML5 • CSS3 • JavaScript • Web Storage',
      liveUrl: 'https://github.com/tk255399-png/Online-exam'
    },
    {
      id: '02',
      title: 'Weather App',
      category: 'websites',
      categoryTag: 'Websites',
      image: 'assets/images/project_weather_app.jpg',
      description: 'Interactive live weather forecast web application featuring city location search, real-time climate metrics, temperature graphs, and atmospheric condition cards.',
      tech: 'JavaScript • OpenWeather API • CSS3 Glassmorphism',
      liveUrl: 'https://github.com/tk255399-png/weather-app'
    },
    {
      id: '03',
      title: 'Task Manager',
      category: 'projects',
      categoryTag: 'Projects',
      image: 'assets/images/project_task_manager.jpg',
      description: 'Modern task & productivity management web application featuring drag-and-drop Kanban columns, priority tagging, filter states, and task completion metrics.',
      tech: 'JavaScript • HTML5 • CSS Grid • LocalStorage',
      liveUrl: 'https://github.com/tk255399-png/Task-Manager'
    },
    {
      id: '04',
      title: 'Mahendra CSE Portal',
      category: 'websites',
      categoryTag: 'Websites',
      image: 'assets/images/project_mahendra_portal.jpg',
      description: 'Academic department portal for Computer Science & Engineering students, featuring course study materials, faculty schedules, and notice board.',
      tech: 'HTML5 • CSS3 • JavaScript • PHP / MySQL',
      liveUrl: 'https://github.com/tk255399-png/mahendra-cse-portal'
    },
    {
      id: '05',
      title: 'Personal Portfolio',
      category: 'websites',
      categoryTag: 'Websites',
      image: 'assets/images/project_portfolio.jpg',
      description: 'Futuristic interactive creative developer portfolio with custom cursor spotlight, transparent portrait cutout, and dark glass aesthetic.',
      tech: 'HTML5 • CSS3 • ES6 JavaScript • Syne Font',
      liveUrl: 'https://github.com/tk255399-png'
    },
    {
      id: '06',
      title: 'AI Assistant UI',
      category: 'ui-ux',
      categoryTag: 'UI/UX',
      image: 'assets/images/project_ai.jpg',
      description: 'Generative AI content studio web application interface featuring dark code widgets, prompt builder controls, and live response previews.',
      tech: 'TypeScript • React • Figma • Tailwind',
      liveUrl: 'https://github.com/tk255399-png'
    }
  ];

  // 1. Category Filter Pill Switching
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 2. Modal Pop-up Launcher
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalTech = document.getElementById('modal-tech');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      const project = projectsData.find(p => p.id === projId);

      if (project && modalBackdrop) {
        if (modalImg) modalImg.src = project.image;
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalDesc) modalDesc.textContent = project.description;
        if (modalTech) modalTech.textContent = `${project.tech} | ${project.liveUrl}`;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalCloseBtn && modalBackdrop) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }
});
