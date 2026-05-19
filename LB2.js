const items = document.querySelectorAll('.gallery-item');

const lightbox = document.getElementById('lightbox');

const content = document.querySelector('.lightbox-content');
const caption = document.querySelector('.lightbox-caption');

const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentGroup = [];
let currentIndex = 0;

/* =========================
   OPEN LIGHTBOX
========================= */

items.forEach(item => {

  item.addEventListener('click', () => {

    const group = item.dataset.group;

    currentGroup = [
      ...document.querySelectorAll(
        `.gallery-item[data-group="${group}"]`
      )
    ];

    currentIndex = currentGroup.indexOf(item);

    showMedia();

    lightbox.classList.add('active');
  });

});

/* =========================
   DISPLAY MEDIA
========================= */

function showMedia() {

  const item = currentGroup[currentIndex];

  const type = item.dataset.type;
  const src = item.dataset.full;
  
  const captionText = item.dataset.caption || '';

  caption.textContent = captionText;

  caption.style.display =
	captionText ? 'block' : 'none';

  content.innerHTML = '';

  if (type === 'image') {

    const img = document.createElement('img');

    img.className = 'lightbox-img';

    img.style.opacity = 0;

    const preload = new Image();

    preload.src = src;

    preload.onload = () => {

      img.src = src;

      requestAnimationFrame(() => {
        img.style.opacity = 1;
      });

    };

    img.addEventListener('click', e => {
      e.stopPropagation();
    });

    content.appendChild(img);

  }

  else if (type === 'video') {

    const video = document.createElement('video');

    video.className = 'lightbox-video';

    video.src = src;

    video.controls = true;
    //video.autoplay = true;

    video.addEventListener('click', e => {
      e.stopPropagation();
    });

    content.appendChild(video);
  }

}

/* =========================
   NAVIGATION
========================= */

function showPrevious() {

  currentIndex =
    (currentIndex - 1 + currentGroup.length)
    % currentGroup.length;

  showMedia();
}

function showNext() {

  currentIndex =
    (currentIndex + 1)
    % currentGroup.length;

  showMedia();
}

prevBtn.addEventListener('click', e => {

  e.stopPropagation();

  showPrevious();

});

nextBtn.addEventListener('click', e => {

  e.stopPropagation();

  showNext();

});

/* =========================
   CLOSE LIGHTBOX
========================= */

function closeLightbox() {

  lightbox.classList.remove('active');

  /* Stop video playback */
  content.innerHTML = '';
}

lightbox.addEventListener('click', closeLightbox);

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener('keydown', e => {

  if (!lightbox.classList.contains('active')) {
    return;
  }

  switch (e.key) {

    case 'Escape':
      closeLightbox();
      break;

    case 'ArrowLeft':
      showPrevious();
      break;

    case 'ArrowRight':
      showNext();
      break;
  }

});