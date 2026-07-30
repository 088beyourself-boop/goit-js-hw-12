import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryElement = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');
// 1. Находим кнопку Load more
const loadMoreBtn = document.querySelector('.load-more');

// Создаем один экземпляр SimpleLightbox на всю страницу
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes:</b> ${likes}</p>
          <p class="info-item"><b>Views:</b> ${views}</p>
          <p class="info-item"><b>Comments:</b> ${comments}</p>
          <p class="info-item"><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  // Добавляем все элементы за одну операцию в DOM
  galleryElement.insertAdjacentHTML('beforeend', markup);

  // Обновляем плагин после добавления новых элементов
  lightbox.refresh();
}

export function clearGallery() {
  galleryElement.innerHTML = '';
}

export function showLoader() {
  if (loaderElement) {
    loaderElement.classList.remove('hidden');
  }
}

export function hideLoader() {
  if (loaderElement) {
    loaderElement.classList.add('hidden');
  }
}

// 2.Функции для показа и скрытия кнопки Load more
export function showLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.remove('hidden');
  }
}

export function hideLoadMoreButton() {
  if (loadMoreBtn) {
    loadMoreBtn.classList.add('hidden');
  }
}
