const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, config) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(config.buttonDisabled);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.buttonDisabled);
  }
}; 

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, config) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add(config.inputError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.messageError);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, config) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove(config.inputError);
  errorElement.classList.remove(config.messageError);
  errorElement.textContent = '';
}; 

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
        // данные атрибута доступны у элемента инпута через ключевое слово dataset.
        // обратите внимание, что в js имя атрибута пишется в camelCase (да-да, в
        // HTML мы писали в kebab-case, это не опечатка)
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, config);
  }
};

// Вызовем функцию isValid на каждый ввод символа
const setEventListeners = (formElement, config) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(config.input));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(config.button);

  toggleButtonState(inputList, buttonElement, config);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, config)

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  formElement.addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
    setTimeout(() => {  // добавим таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
      toggleButtonState(inputList, buttonElement, config), 0 })
  })
};

function enableValidation(config) {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.form));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, config);
  });
};

export {enableValidation}