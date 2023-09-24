// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);

const galleryList = document.querySelector('.gallery');
const galleryImageList = galleryItems
  .map(image => {
    return `<li class="gallery__item">
      <a class="gallery__link" href="${image.original}">
  <img class="gallery__image" src="${image.preview}" alt="${image.description}" title="${image.description}" data-source="${image.original}" />
</a>
    </li>`;
  })
  .join('');

galleryList.insertAdjacentHTML('beforeend', galleryImageList);
const lightbox = new SimpleLightbox('.gallery a', {
  //   captionPosition: 'outside',
  captionDelay: 250,
  nav: false,
  close: false,
  showCounter: false,
  captions: true,

  captionData: 'alt',
  disableScroll: true,
  scrollZoom: false,
});
