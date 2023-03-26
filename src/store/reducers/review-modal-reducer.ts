import {createSlice} from '@reduxjs/toolkit';

import {CommentShort} from '../../types/review';

interface ReviewModalState {
    isReviewModal: boolean;
    currentComment: CommentShort | null;

    currentBookId: number | null;
}

const initialState: ReviewModalState = {
    isReviewModal: false,
    currentComment: null,
    currentBookId: null,
}

export const ReviewModalReducer = createSlice({
        name: 'reviewModal',
        initialState,
        reducers: {
            setIsReviewModalTrue: (state) => {
                state.isReviewModal = true;
            },
            setIsReviewModalFalse: (state) => {
                state.isReviewModal = false;
            },
            setCurrentComment: (state, comment) => {
                state.currentComment = comment.payload;
            },
            setCurrentBookId: (state, bookId) => {
                state.currentBookId = bookId.payload;
            },
        }
    }
);

export default ReviewModalReducer.reducer;
export const { setIsReviewModalTrue, setIsReviewModalFalse, setCurrentComment, setCurrentBookId } = ReviewModalReducer.actions;
