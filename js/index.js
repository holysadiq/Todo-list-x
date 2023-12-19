'use strict';

///////////////////////////////
// MAIN CODE FIXME
import icons from 'url:../images/icon-moon.svg';
import icons from 'url:../images/icon-sun.svg';
import iconCross from 'url:../images/icon-cross.svg';
let todoArr = [];
const body = document.body;
const icon = document.getElementById('icons');
const input = document.getElementById('name');
const btnCompleted = document.getElementById('completed');
const header = document.querySelector('header');
const top = document.querySelector('.top');
const layoutsContainer = document.querySelector('.layouts__items');
const newTodoInput = document.querySelector('.search');
const layouts = document.querySelector('.layouts');
const footer = document.querySelector('.footer');
const footerSecond = document.querySelector('.second');
const allTodosButtonSmall = document.querySelector('.second-text-1');
const textLabelsItems = document.querySelector('.layouts__items');
const btnSortActive = document.querySelector('.footer__box--elements-mid--2');
const btnSortActiveSmall = document.querySelector('.text-2');
const btnSortCompleteSmall = document.querySelector('.text-3');
const btnSortComplete = document.querySelector('.footer__box--elements-mid--3');
const allTodosButton = document.querySelector('.footer__box--elements-mid--1');

/////////  FUNCTIONS

///// RENDERING NEW TODOS
const renderTodos = function (e, i) {
  layoutsContainer.innerHTML = '';
  newTodoInput.value = '';
  todoArr.forEach(element => {
    const type = element.completed ? 'completed' : 'active';

    const newTodo = `
      <div class="layouts__items">
        <div class="layouts__radio-items">
          <input class="layouts__radio-puts" type="checkbox" id="${
            element.id
          }" ${element.completed ? 'checked' : ''}/>

          <label draggable="true" for="${
            element.id
          }" class="layouts__radio-tikis" id="text">
            <div  class="check  ${element.completed ? '' : 'hidden'}">
              <img src="/icon-check.8917ad3b.svg" class="check-sign" />
            </div>
            ${element.title}
          </label>
      <span id="clear" class="layouts__radio-clear hidden">
        <img src="${iconCross}" class="icons-clear" />
      </span>
    </div>

      `;

    layoutsContainer.insertAdjacentHTML('beforeend', newTodo);
  });

  /////////////////////// MARK TODOS AS COMPLETE
  ClearTodos();
  /// Updating the todos counts
  updateTodoCount();

  // getLocalStorage();
};

/////// Adding new TODOS
const addNewTodo = function (title) {
  const newTodoItem = {
    id: todoArr.length + 1,
    title: title,
    completed: false,
    active: true,
  };

  todoArr.push(newTodoItem);

  renderTodos();
  // setLocalStorage();
};

///////  Clearing TODOS
const ClearTodos = function () {
  const todoItems = document.querySelectorAll('.layouts__radio-items');
  todoItems.forEach((item, index) => {
    const textLabel = item.querySelector('.layouts__radio-tikis');
    const clearButton = item.querySelector('.layouts__radio-clear');

    textLabel.addEventListener('click', function () {
      clearButton.classList.toggle('hidden');
    });

    clearButton.addEventListener('click', function (e) {
      e.preventDefault();

      todoArr.splice(index, 1);
      renderTodos();

      if (todoArr.length === 0) {
        footer.classList.add('hidden');
        footerSecond.classList.add('hidden');
      }
    });

    item.addEventListener('mouseover', function () {
      clearButton.classList.remove('hidden');
    });

    item.addEventListener('mouseout', function () {
      clearButton.classList.add('hidden');
    });
  });
};

/// Updating the TODOS counts
const updateTodoCount = function () {
  const todoItems = document.querySelectorAll('.layouts__radio-items');
  const todoCountElement = document.querySelector('.footer__box--elements');

  const totalTodos = todoItems.length;
  const completedTodos = document.querySelectorAll('.cross-line').length;
  const remainingTodos = totalTodos - completedTodos;

  todoCountElement.textContent = `${remainingTodos} left`;
};
// sorting Active TODOS
const sortActive = function () {
  todoArr.forEach((_, i) => {
    const textLabel = document.querySelectorAll('.layouts__radio-tikis')[i];

    if (!textLabel.classList.contains('cross-line')) {
      todoArr.sort((a, b) => a.active - b.completed);
      renderTodos();
    }
  });
};

// sorting completed TODOS
const sortCompleted = function () {
  todoArr.forEach((e, i) => {
    !e.completed;
    const textLabel = document.querySelectorAll('.layouts__radio-tikis')[i];

    if (textLabel.classList.contains('cross-line')) {
      todoArr.sort((a, b) => !a.completed - b.completed);

      renderTodos();
    }
  });
};

// Clearing completed TODOS
const clearCompletedTodos = function () {
  const completedIndexes = [];

  todoArr.forEach((_, i) => {
    const textLabel = document.querySelectorAll('.layouts__radio-tikis')[i];

    if (textLabel.classList.contains('cross-line')) {
      completedIndexes.push(i);
    }
  });

  completedIndexes.reverse();

  completedIndexes.forEach(i => {
    todoArr.splice(i, 1);
  });

  renderTodos();

  if (todoArr.length === 0) {
    footer.classList.add('hidden');
    footerSecond.classList.add('hidden');
  }
};

/// Enabling Dark Mode
const enableDarkMode = function () {
  body.classList.add('color-changed');
  header.classList.add('image-changed');
  icon.classList.add('icon-changed');
  layouts.classList.add('layouts-changed');
  top.classList.add('top-changed');
  newTodoInput.classList.add('top-changed');
  footer.classList.add('footer-changed');
  footerSecond.classList.add('footer-changed');

  localStorage.setItem('colorPreference', 'dark');

  applyDarkModeColors();
};

/// Disabling Dark Mode
const disableDarkMode = function () {
  body.classList.remove('color-changed');
  header.classList.remove('image-changed');
  icon.classList.remove('icon-changed');
  layouts.classList.remove('layouts-changed');
  top.classList.remove('top-changed');
  newTodoInput.classList.remove('top-changed');
  footer.classList.remove('footer-changed');
  footerSecond.classList.remove('footer-changed');

  localStorage.setItem('colorPreference', 'light');

  applyLightModeColors();
};

/// Applying Dark Mode
const applyDarkModeColors = function () {
  input.style.color = 'var(--color-secondary-3)';
  document.documentElement.style.setProperty(
    '--color-secondary-light-1',
    'var(--color-secondary-3)'
  );
  document.documentElement.style.setProperty(
    '--color-tertiary-hover',
    'var(--color-secondary--4)'
  );
};

/// Applying Light Mode
const applyLightModeColors = function () {
  input.style.color = 'var(--color-secondary-light-2)';

  document.documentElement.style.setProperty(
    '--color-secondary-light-1',
    'var(--color-secondary-light-2)'
  );

  document.documentElement.style.setProperty(
    '--color-tertiary-hover',
    'var(--color-primary--1)'
  );
};

// Set local Storage
// const setLocalStorage = function () {
//   localStorage.setItem('todos', JSON.stringify(todoArr));
// };

// const getLocalStorage = function () {
//   const data = JSON.parse(localStorage.getItem('todos'));
//   console.log(data);
//   if (!data) return;

//   todoArr = data;

//   // todoArr.forEach((todo) => renderTodos(todo))
// };

//// CALL FUNCTIONS WITH INIT Function
const init = function () {
  renderTodos();
  ClearTodos();
  updateTodoCount();
};
init();

// Retrieve the color preference from local storage
const colorPreference = localStorage.getItem('colorPreference');
if (colorPreference === 'dark') {
  enableDarkMode();
}
/// Event Listeners
icon.addEventListener('click', function (e) {
  e.preventDefault();
  if (body.classList.contains('color-changed')) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

newTodoInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const newTodoTitle = newTodoInput.value.trim();

    if (newTodoTitle !== '') {
      addNewTodo(newTodoTitle);
      newTodoInput.value = '';
      footer.classList.remove('hidden');
      footerSecond.classList.remove('hidden');
    } else {
      console.log('Empty Todo');
    }
  }
});

textLabelsItems.addEventListener('click', function (e) {
  const clicked = e.target.closest('.layouts__radio-tikis');
  if (!clicked) return;
  clicked.classList.toggle('cross-line');
});
/*
  /// Drag and drop  For later Knowledge
  textLabelsItems.addEventListener('dragstart', function (e) {
    draggableItem = e.target;
    e.target.style.opacity = '0.5';
  });
  textLabelsItems.addEventListener('dragstart', function (e) {
    e.target.style.opacity = '1';
    draggableItem = null;
  });
  textLabelsItems.addEventListener('dragover', function (e) {
    e.preventDefault();
  });
*/
document.addEventListener('keydown', function (e) {
  if (e.key === 'Delete') {
    clearCompletedTodos();
  }
});
allTodosButton.addEventListener('click', function (e) {
  e.preventDefault();
  renderTodos();
});

allTodosButtonSmall.addEventListener('click', function (e) {
  e.preventDefault();
  renderTodos();
});
btnSortComplete.addEventListener('click', sortCompleted);
btnSortCompleteSmall.addEventListener('click', sortCompleted);
btnSortActive.addEventListener('click', sortActive);
btnSortActiveSmall.addEventListener('click', sortActive);
btnCompleted.addEventListener('click', clearCompletedTodos);
