'use strict';

const books = {
  waxworks: {
    title: 'Mr Grumblebum at the Waxworks',
    image: '/assets/waxworks.jpg',
    detail: 'A chase, a hiding place and plenty of surprises.',
    au: 'https://www.amazon.com.au/s?k=9798369422946',
    additional: 'https://www.xlibris.com/en/bookstore/bookdetails/849668-mr-grumblebum-at-the-waxworks',
    additionalLabel: 'View publisher listing',
    note: 'The publisher may show US-dollar prices. Compare total costs and delivery before purchasing.'
  },
  lighthouse: {
    title: 'Mr Grumblebum at the Lighthouse',
    image: '/assets/lighthouse.jpg',
    detail: 'Foo the cat, a dolphin friend and a nighttime rescue.',
    au: 'https://www.amazon.com.au/s?k=9781669879299',
    additional: null,
    note: 'This opens an Australian retailer search, not a guaranteed in-stock offer. Please check format, seller and delivery.'
  },
  graffiti: {
    title: 'Mr Grumblebum and the Graffiti Gang',
    image: '/assets/graffiti.jpg',
    detail: 'The Graffiti Buster is on the case in Farleigh.',
    au: 'https://www.amazon.com.au/s?k=9798369494776',
    additional: 'https://www.thenile.com.au/books/david-graham/mr-grumblebum-and-the-graffiti-gang/9798369494776',
    additionalLabel: 'Check Australian listing',
    note: 'The additional Australian listing may show the book as unavailable. Availability and prices can change.'
  }
};

const select = document.getElementById('book-select');
const cover = document.getElementById('selected-cover');
const title = document.getElementById('selected-title');
const detail = document.getElementById('selected-description');
const australianSearch = document.getElementById('au-search');
const additionalListing = document.getElementById('other-listing');
const note = document.getElementById('finder-note');

function selectBook(key) {
  const book = books[key];
  if (!book) return;
  select.value = key;
  title.textContent = book.title;
  detail.textContent = book.detail;
  cover.src = book.image;
  cover.alt = 'Selected book: ' + book.title;
  australianSearch.href = book.au;
  if (book.additional) {
    additionalListing.hidden = false;
    additionalListing.href = book.additional;
    additionalListing.innerHTML = book.additionalLabel + ' <span aria-hidden="true">↗</span>';
  } else {
    additionalListing.hidden = true;
    additionalListing.removeAttribute('href');
  }
  note.textContent = book.note;
}

select?.addEventListener('change', function () { selectBook(select.value); });

document.querySelectorAll('[data-book]').forEach(function(link) {
  link.addEventListener('click', function () {
    selectBook(link.getAttribute('data-book'));
  });
});

const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('primary-nav');

function closeMenu() {
  menu?.setAttribute('aria-expanded', 'false');
  menu?.setAttribute('aria-label', 'Open navigation');
  navigation?.classList.remove('open');
}

menu?.addEventListener('click', function () {
  const isOpen = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!isOpen));
  menu.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation?.classList.toggle('open', !isOpen);
});

navigation?.querySelectorAll('a').forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') closeMenu();
});
