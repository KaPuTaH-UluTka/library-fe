export enum AppPaths {
    main = '/',
    books = '/books',
    booksAll = '/books/all',
    booksCategory = '/books/:category',
    book = '/books/:category/:bookId',
    terms = '/terms',
    contract = '/contract',
    registration = '/registration',
    auth = '/auth',
    forgotPass = '/forgot-pass',

    userProfile = '/profile'
}

export enum ApiPaths {
    books = '/books',
    categories = '/categories',

    createUser = '/auth/local/register',

    loginUser = '/auth/local',

    forgotPassword = '/auth/forgot-password',

    resetPassword = '/auth/reset-password',

    booking = '/bookings',

    comment = '/comments'
}

export enum DataTestId {
    ButtonHideReviews = 'button-hide-reviews',
    BookTitle = 'book-title',
    BreadcrumbsLink = 'breadcrumbs-link',
    BookName = 'book-name',
    ButtonBurger = 'button-burger',
    Loader = 'loader',
    Error = 'error',
    AlertClose = 'alert-close',
    Auth = 'auth',
    AuthForm = 'auth-form',
    RegisterForm = 'register-form',
    SendEmailForm = 'send-email-form',
    ResetPasswordForm = 'reset-password-form',
    Hint = 'hint',
    EyeClosed = 'eye-closed',
    EyeOpened = 'eye-opened',
    CheckMark = 'checkmark',
    ExitButton = 'exit-button',
    StatusBlock = 'status-block',
    Content = 'content',
    BookingButton = 'booking-button',
    ModalOuter = 'modal-outer',
    BookingModal = 'booking-modal',
    ModalTitle = 'modal-title',
    ModalRateBook = 'modal-rate-book',
    ModalCloseButton = 'modal-close-button',
    ModalSelect = 'month-select',
    ButtonPrevMonth = 'button-prev-month',
    ButtonNextMouth = 'button-next-month',
    Calendar = 'calendar',
    BookingCancelButton = 'booking-cancel-button',
    Rating = 'rating',
    Star = 'star',
    StarActive = 'star-active',
    Reviews = 'reviews',
    Comment = 'comment',
    CommentWrapper = 'comment-wrapper',
    CommentAuthor = 'comment-author',
    CommentDate = 'comment-date',
    CommentText = 'comment-text',
    ButtonComment = 'button-comment',
    ButtonRateBook = 'button-rate-book',

}

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
    bookingSuccess = 'Книга забронирована. Подробности можно посмотреть на странице Профиль',
    bookingError = 'Что-то пошло не так, книга не забронирована. Попробуйте позже!',
    responseError = 'Что-то пошло не так. Обновите страницу через некоторое время.',
}
