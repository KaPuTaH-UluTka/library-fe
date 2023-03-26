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
