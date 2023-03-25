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

    me = '/users/me',

    updateUser = '/users',

    forgotPassword = '/auth/forgot-password',

    resetPassword = '/auth/reset-password',

    booking = '/bookings',

    comment = '/comments',

    uploadAvatar = '/upload'
}

export enum DataTestId {
    SlideBig = 'slide-big',
    SlideMini = 'slide-mini',
    HighLightMatches = 'highlight-matches',
    MainPage = 'main-page',
    BurgerNavigation = 'burger-navigation',
    BurgerNavigationLink = 'burger-',
    BurgerNavigationLinkCount = 'burger-book-count-for-',
    BurgerShowcase = 'burger-showcase',
    BurgerBooks = 'burger-books',
    BurgerTerms = 'burger-terms',
    BurgerContract = 'burger-contract',
    NavigationLink = 'navigation-',
    NavigationLinkCount = 'navigation-book-count-for-',
    NavigationShowcase = 'navigation-showcase',
    NavigationBooks = 'navigation-books',
    NavigationTerms = 'navigation-terms',
    NavigationContract = 'navigation-contract',
    Card = 'card',
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
    MonthSelect = 'month-select',
    ButtonPrevMonth = 'button-prev-month',
    ButtonNextMonth = 'button-next-month',
    Calendar = 'calendar',
    DayButton = 'day-button',
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
    ProfileAvatar = 'profile-avatar',
    ProfileButton = 'profile-button',
    EditButton = 'edit-button',
    SaveButton = 'save-button',
    ProfileForm = 'profile-form',
    EmptyBlueCard = 'empty-blue-card',
    Expired = 'expired',
    CancelBookingButton = 'cancel-booking-button',
    History = 'profile-history',
    HistoryReviewButton = 'profile-history-review-button',
    HistorySlide = 'profile-history-slide'

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
