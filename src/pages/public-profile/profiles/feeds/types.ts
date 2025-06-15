import { IPostContent, IComment } from './blocks/Post1';

// Generic representation of a social post with its comments.
export interface IPostData {
  content: IPostContent;
  comments: IComment[];
}
