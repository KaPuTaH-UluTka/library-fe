import {CommentInterface} from '../types/book';

export const commentExist = (comments: CommentInterface[], id: number) => {

    const isCommentExist = comments.find(el => el.user.commentUserId === id);

    return !!isCommentExist;
}
