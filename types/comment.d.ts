import {UserInfo,ResponseDate,ArticleRaw} from "./index";


export interface CommentRaw{
    id           :number;
    date         :ResponseDate;
    article_id   :ArticleRaw['id'];
    author_id    :UserInfo['id'];
    md_content   :string;
    reply_to    ?:CommentRaw['id'];
    inform_list ?:UserInfo['id'][];
    deleted     ?:boolean;
}
export interface CommentInfo extends Pick<CommentRaw,
    'id'
    |'date'
    |'article_id'
    |'author_id'
    |'md_content'
    |'reply_to'
>{
    inform_list ?:UserInfo[];
}

