export interface BookingFields {
    data: {
        order: boolean;
        dateOrder: string;
        book: string;
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
