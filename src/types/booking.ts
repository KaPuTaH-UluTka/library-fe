export interface BookingRequest {
    data: {
        order: boolean;
        dateOrder: string;
        book: number;
        customer: string;
    }
}

export interface BookingResponse {
    data: {
        id: number;
        attributes: {
            order: boolean;
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            dateOrder: string;
        }
    }
    meta: object;
}
