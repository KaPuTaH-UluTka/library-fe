export interface BookInterface {
    id: number,
    title: string,
    rating: number,
    issueYear: string,
    description: string,
    publish: string,
    pages: string,
    cover: string,
    weight: string,
    format: string,
    ISBN: string,
    producer: string,
    authors: [
        string
    ],
    images: [
        {
            url: string
        },
    ],
    categories: [
        string,
        string
    ],
    comments: CommentInterface[
    ] | null,
    booking: {
        id: number,
        order: boolean | null,
        dateOrder: string,
        customerId: number,
        customerFirstName: string,
        customerLastName: string
    } | null,
    delivery: {
        id: number | null,
        handed: boolean | null,
        dateHandedFrom: string,
        dateHandedTo: string,
        recipientId: number,
        recipientFirstName: string,
        recipientLastName: string
    } | null,
    histories: [
        {
            id: number,
            userId: number
        }
    ]
}

export interface CommentInterface {
    id: number,
        rating: number,
        text: string,
        createdAt: string,
        user: {
        commentUserId: number,
            firstName: string | null,
            lastName: string | null,
            avatarUrl: string
    }
}

export interface UserBook {
    id: number,
    title: string,
    rating: number,
    issueYear: string | null,
    authors: string[],
    image: string | null,
}
