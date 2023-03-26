



export enum RegistrationErrorMessages {
    required = 'Поле не может быть пустым',
    latinAlphabet = 'латинский алфавит',
    numbers = 'цифры',
    atLeastEightCharacters = 'не менее 8 символов',
    withNumber = 'цифрой',
    withUpperLetter = 'с заглавной буквой',
    phone = 'В формате +375 (xx) xxx-xx-xx',
    email = 'Введите корректный e-mail',
}

export enum RegistrationResponseErrors {
    userExist = 'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
    smthWrong = 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
}

export enum LoginResponseErrors {
    incorrectLoginOrPassword = 'Неверный логин или пароль!',
    smthWrong = 'Что-то пошло не так. Попробуйте ещё раз',

}

export enum ForgotErrorMessages {
    comparePasswords = 'Пароли не совпадают',
    smthWrong = 'Что-то пошло не так. Попробуйте ещё раз',
}

export enum ToastMessages {
    commentSuccess = 'Спасибо, что нашли время оценить книгу!',
    commentError = 'Оценка не была отправлена. Попробуйте позже!',
    commentUpdateSuccess = 'Спасибо, что нашли время изменить оценку!',
    bookingCreateSuccess = 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
    bookingCreateError = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
    generalUpdateSuccess = 'Изменения успешно сохранены!',
    generalUpdateError = 'Изменения не были сохранены. Попробуйте позже!',
    bookingCancelSuccess = 'Бронирование книги успешно отменено!',
    bookingCancelError = 'Не удалось снять бронирование книги. Попробуйте позже!',
    responseError = 'Что-то пошло не так. Обновите страницу через некоторое время.',
    avatarSuccess = 'Фото успешно сохранено!',
    avatarError = 'Что-то пошло не так, фото не сохранилось. Попробуйте позже!'
}

export enum PlugMessages {
    bookedBookTitle = 'Забронируйте книгу \nи она отобразится',
    currentBookTitle = 'Прочитав книгу, \nона отобразится в истории',
    history = 'Вы не читали книг \nиз нашей библиотеки',
    bookingExpiredTitle = 'Дата бронирования \nкниги истекла',
    bookingExpiredDescription = 'Через 24 часа книга будет  доступна всем',
    handedExpiredTitle = 'Вышел срок \nпользования книги',
    handedExpiredDescription = 'Верните книгу, пожалуйста',
}

export enum ProfileSectionText {
    userDataTitle = 'Учётные данные',
    userDataDescription = 'Здесь вы можете отредактировать информацию о себе',
    bookedBookTitle = 'Забронированная книга',
    bookedBookDescription = 'Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь',
    handledBookTitle = 'Книга которую взяли',
    handledBookDescription = 'Здесь можете просмотреть информацию о книге и узнать сроки возврата',
    historyTitle = 'История',
    historyDescription = 'Список прочитанных книг',
}
