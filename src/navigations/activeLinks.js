export function updateActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    const currentHash = window.location.hash || '#dashboard';
  
    links.forEach((link) => {
      link.getAttribute('href') === currentHash
        ? link.classList.add('active')
        : link.classList.remove('active');
    });
  }