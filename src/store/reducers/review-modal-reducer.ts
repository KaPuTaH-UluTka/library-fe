import {createSlice} from '@reduxjs/toolkit';

import {CommentShort} from '../../types/review';

interface ReviewModalState {
    isReviewModal: boolean;
    currentComment: CommentShort | null;
}

const initialState: ReviewModalState = {
    isReviewModal: false,
    currentComment: null,
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
        }
    }
);

export default ReviewModalReducer.reducer;
export const { setIsReviewModalTrue, setIsReviewModalFalse, setCurrentComment } = ReviewModalReducer.actions;
