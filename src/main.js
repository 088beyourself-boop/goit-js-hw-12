import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;

form.addEventListener('submit', handleSearch);
loadMoreBtn.addEventListener('click', handleLoadMore); // Слушатель для кнопки Load more

// 1. Делаем функцию асинхронной, добавив слово async
async function handleSearch(event) {
  event.preventDefault();

  // Сохраняем запрос в глобальную переменную (понадобится для Load more)
  searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a search term before submitting!',
      position: 'topRight',
    });
    return;
  }

  // При новом поиске всегда сбрасываем страницу на 1
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton(); // Прячем кнопку на время загрузки
  showLoader();

  try {
    // Вместо .then() используем await
    const data = await getImagesByQuery(searchQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
}

// 2. Добавляем новую асинхронную функцию для кнопки Load more
async function handleLoadMore() {
  currentPage += 1; // Увеличиваем страницу на 1
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(searchQuery, currentPage);
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      // getBoundingClientRect возвращает размеры элемента
      const cardHeight = galleryItem.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    const totalPages = Math.ceil(data.totalHits / 15);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
