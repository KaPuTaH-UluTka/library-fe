import {CommentInterface} from '../types/book';

export const commentExistChecker = (comments: CommentInterface[], id: number) => {

    const isCommentExist = comments.find(el => el.user.commentUserId === id);

    return !!isCommentExist;
}
