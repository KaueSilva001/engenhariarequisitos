document.addEventListener('DOMContentLoaded', function() {
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
  
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      mainContent.classList.toggle('shifted'); // NÃO precisa dessa linha mais! (já expliquei no CSS com ~)
    });
  
    document.addEventListener('click', (event) => {
      const isClickInsideSidebar = sidebar.contains(event.target);
      const isClickMenuButton = menuToggle.contains(event.target);
  
      if (!isClickInsideSidebar && !isClickMenuButton) {
        sidebar.classList.remove('open');
      }
    });
  });
  
