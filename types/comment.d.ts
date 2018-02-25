import {UserInfo,ResponseDate,ArticleRaw} from "./index";


export interface CommentRaw{
    id         :number;
    date       :ResponseDate;
    article_id :ArticleRaw['id'];
    author     :UserInfo['id'];
    md_content :string;
    reply_to  ?:CommentRaw['id'];
    deleted   ?:boolean;
}
export interface CommentInfo extends Pick<CommentRaw,
    'id'
    |'date'
    |'article_id'
    |'author'
    |'md_content'
    |'reply_to'
>{

}

