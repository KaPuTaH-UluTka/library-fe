import {CommentInterface} from './book';

export interface BookCardInterface {
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
    image:
        {
            url: string
        },
    categories: [
        string,
        string
    ],
    comments: CommentInterface[
        ] | null,
    booking: {
        id: number | null,
        order: boolean | null,
        dateOrder: string,
        customerId: number,
        customerFirstName: string,
        customerLastName: string
    },
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
