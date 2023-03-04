export enum AppPaths {
    main = '/',
    books = '/books',
    booksAll = '/books/all',
    booksCategory = '/books/=category',
    book = '/books/=category/=bookId',
    terms = '/terms',
    contract = '/contract',
    registration = '/registration',
    auth = '/auth',
    forgotPass = '/forgot-pass'
}

export enum ApiPaths {
    books = '/books',
    categories = '/categories'
}

export enum DataTestId {
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
}

export enum RegistrationErrorMessages {
    required = 'Поле не может быть пустым',
    latinAlphabet = 'латинский алфавит',
    numbers = 'цифры',
    atLeastEightCharacters = 'не менее 8 символов',
    withNumber = 'цифрой',
    withUpperLetter = 'с заглавной буквой',
}
