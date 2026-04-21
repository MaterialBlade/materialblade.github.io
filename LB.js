const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentGroup = [];
let currentIndex = 0;

// Open lightbox
images.forEach(img => {
  img.addEventListener('click', () => {
    const group = img.dataset.group;

    currentGroup = [...document.querySelectorAll(`img[data-group="${group}"]`)];
    currentIndex = currentGroup.indexOf(img);

    showImage();
    lightbox.classList.add('active');
  });
});

function showImage() {
  lightboxImg.style.opacity = 0;

  const img = new Image();
  img.src = currentGroup[currentIndex].dataset.full;

  img.onload = () => {
    lightboxImg.src = img.src;
    lightboxImg.style.opacity = 1;
  };
}

// Navigation
prevBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
  showImage();
});

nextBtn.addEventListener('click', e => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % currentGroup.length;
  showImage();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  switch (e.key) {
    case 'Escape':
      lightbox.classList.remove('active');
      break;

    case 'ArrowLeft':
      currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
      showImage();
      break;

    case 'ArrowRight':
      currentIndex = (currentIndex + 1) % currentGroup.length;
      showImage();
      break;
  }
});

// Close on click outside
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});