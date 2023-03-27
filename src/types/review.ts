export interface CommentFields  {
    rating: number;
    text: string;
    book: string;
    user: string;
}

export interface CommentResponse {
    data: {
        id: number;
        attributes: {
            rating: number;
            text: string;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
        }
    }
    meta: object;
}

export interface CommentShort {
    id: number;
    rating: number;
    text: null | string;
    bookId: number;
}

export interface Comment {
    id: number;
    rating: number | null;
    text: string | null;
    createdAt: string;
    user: {
        commentUserId: number;
        firstName: string;
        lastName: string;
        avatarUrl: string;
    };
}
