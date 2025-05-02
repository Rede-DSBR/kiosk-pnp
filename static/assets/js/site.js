document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("navigation");
    const menuRef = document.getElementById("menuref");

    const originalClasses = menuRef.className;
  
    menuButton.addEventListener("click", function () {
        // Se o elemento não tiver nenhuma classe
        if (menuRef.className.trim() === "d-none") {
          // Restaura as classes originais
          menuRef.className = originalClasses;
        } else {
          // Remove todas as classes e adiciona uma nova
          menuRef.className = "";
          menuRef.classList.add("d-none");
        }
      });
  });