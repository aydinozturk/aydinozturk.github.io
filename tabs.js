document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Tüm tab ve içeriklerden active sınıfını kaldır
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((tc) => tc.classList.remove("active"));
      // Tıklanan tab ve ilgili içeriğe active ekle
      this.classList.add("active");
      document.getElementById(this.dataset.tab).classList.add("active");
    });
  });
});
