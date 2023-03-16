export interface ReviewFields  {
    rating: number;
    text: string;
    book: string;
    user: string;
}

export interface ReviewResponse {
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
