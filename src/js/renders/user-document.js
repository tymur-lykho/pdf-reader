import userDocuments from '../user-documents.json';

const docContainer = document.querySelector('.documents-container');
const filterForm = document.querySelector('form');
const sortOptions = document.getElementById('sort-selector');
const filterOptions = document.getElementById('filter-selector');
const filterInput = document.getElementById('search-input');

let selectedSortOption = '';
let filteredDocs = [];

sortOptions.addEventListener('click', sortDocumentList);
filterForm.addEventListener('submit', filterDocumentList);
filterInput.addEventListener('input', filterDocumentList);
docContainer.addEventListener('click', event => {
  const button = event.target.closest('.js-document-btn');
  if (button) {
    toggleContextMenu(button);
    return;
  }

  const contextMenu = document.getElementById(
    'speed-dial-menu-dropdown-alternative'
  );
  if (contextMenu && !contextMenu.contains(event.target)) {
    contextMenu.remove();
  }
});

const documentCollector = docs => {
  return docs
    .map(({ id, title, author, uploadDate }) => {
      return `<li
      class="flex flex-col p-[16px] pr-[32px] border-solid rounded-xl outline sm:flex-row relative"
    >
      <h2 class="text-left grow-7">${title}</h2>
      <div class="flex grow-0 sm:gap-[16px]">
        <p>${author}</p>
        <time datetime="${uploadDate}">${uploadDate}</time>
      </div>
      <button data-documentid='${id}' class="js-document-btn absolute inset-y-0 right-[12px] transition-[scale] duration-250 ease-in-out hover:scale-[1.2] " type="button">
        <img src="/img/three-dots.svg" width="20" height="20" />
      </button>
    </li>`;
    })
    .join('');
};

renderContent(userDocuments);

function sortDocumentList(event) {
  event.preventDefault();
  const selectOption = event.target.options[event.target.selectedIndex].value;
  if (selectOption === selectedSortOption || selectOption === 'Sorted by') {
    return;
  }
  selectedSortOption = selectOption;
  let sortedDocs = [];
  const documentsList = filteredDocs.length > 0 ? filteredDocs : userDocuments;
  switch (selectOption) {
    case 'name-up':
      sortedDocs = documentsList.toSorted((firstDoc, secondDoc) =>
        firstDoc.title.localeCompare(secondDoc.title)
      );
      break;

    case 'name-down':
      sortedDocs = documentsList.toSorted((firstDoc, secondDoc) =>
        secondDoc.title.localeCompare(firstDoc.title)
      );
      break;

    case 'author-up':
      sortedDocs = documentsList.toSorted((firstDoc, secondDoc) =>
        firstDoc.author.localeCompare(secondDoc.author)
      );
      break;

    case 'author-down':
      sortedDocs = documentsList.toSorted((firstDoc, secondDoc) =>
        secondDoc.author.localeCompare(firstDoc.author)
      );
      break;

    case 'date-up':
      sortedDocs = documentsList.toSorted((firstDoc, secondDoc) => {
        const firstDocDate = new Date(firstDoc.uploadDate);
        const secondDocDate = new Date(secondDoc.uploadDate);
        return firstDocDate - secondDocDate;
      });
      break;

    case 'date-down':
      sortedDocs = documentsList.toSorted((firstDoc, secondDoc) => {
        const firstDocDate = new Date(firstDoc.uploadDate);
        const secondDocDate = new Date(secondDoc.uploadDate);
        return secondDocDate - firstDocDate;
      });
      break;
  }
  renderContent(sortedDocs);
}

function filterDocumentList(event) {
  event.preventDefault();
  const filterBy = filterOptions.options[filterOptions.selectedIndex].value;
  const inputValue = filterInput.value;
  if (filterBy === 'Filter by') {
    return;
  }
  switch (filterBy) {
    case 'name':
      filteredDocs = userDocuments.filter(doc =>
        doc.title.toUpperCase().includes(inputValue.toUpperCase())
      );
      break;
    case 'author':
      filteredDocs = userDocuments.filter(doc =>
        doc.author.toUpperCase().includes(inputValue.toUpperCase())
      );
      break;
  }
  renderContent(filteredDocs);
}

function renderContent(content) {
  docContainer.innerHTML = '';
  if (content.length > 0) {
    docContainer.insertAdjacentHTML('beforeend', documentCollector(content));
  } else {
    docContainer.insertAdjacentHTML('beforeend', '<p>No results...</p>');
  }
}

function toggleContextMenu(btn) {
  const existingMenu = document.getElementById(
    'speed-dial-menu-dropdown-alternative'
  );

  if (existingMenu) {
    existingMenu.remove(); // Якщо меню вже відкрите — закриваємо
    return;
  }

  console.log(btn.dataset.documentid); // Лог documentid

  btn.insertAdjacentHTML(
    'afterend',
    `
    <div id="speed-dial-menu-dropdown-alternative" class="absolute right-0 z-10 flex flex-col justify-end py-1 space-y-2 bg-white border border-gray-100 rounded-lg shadow-xs dark:bg-gray-700 dark:border-gray-600">
      <ul class="text-sm text-gray-500 dark:text-gray-300">
        <li>
          <a href="#" onclick="shareDocument('${btn.dataset.documentid}')" class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
            Share
          </a>
        </li>
        <li>
          <a href="#" onclick="printDocument('${btn.dataset.documentid}')" class="flex items-center px-5 py-2 border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white dark:border-gray-600">
            Print
          </a>
        </li>
        <li>
          <a href="#" onclick="saveDocument('${btn.dataset.documentid}')" class="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
            Save
          </a>
        </li>
        <li>
          <a href="#" onclick="deleteDocument('${btn.dataset.documentid}')" class="flex items-center px-5 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white">
            Delete
          </a>
        </li>
      </ul>
    </div>`
  );
}
