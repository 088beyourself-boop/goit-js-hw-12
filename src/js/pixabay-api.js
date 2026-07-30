import axios from 'axios';

const API_KEY = '30574226-c78049c6609f1ef002c05ad71';
const BASE_URL = 'https://pixabay.com/api/';

// 1. Добавляем async перед
export async function getImagesByQuery(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    // 2. Добавляем плагинации
    per_page: 15,
    page: page,
  };

  // 3. Заменяем.then() на await
  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
