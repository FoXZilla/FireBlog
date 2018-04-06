import {CategoryInfo, CommentInfo, TagInfo, UserInfo,Omit, ResponseDate} from "./index";


export interface ArticleRaw{
    id             :number;
    title          :string;
    description   ?:string;
    cover         ?:string;
    state          :ArticleStatus;
    tag_list       :TagInfo['alias'][];
    category_list  :CategoryInfo['alias'][];
    update_time    :ResponseDate;
    create_time    :ResponseDate;
    view_count     :number;
    md_content     :string;
    meta          ?:{
        password      ?:string;
        password_hint ?:string;
        no_comment    ?:boolean;
        hide_in_list  ?:boolean;
    };
}
export interface ArticleInfo extends Pick<ArticleRaw,
    'id'
    |'title'
    |'description'
    |'cover'
    |'state'
    |'tag_list'
    |'category_list'
    |'update_time'
    |'create_time'
    |'view_count'
    |'md_content'
>{
    comment_count  :number;
    comment_list   :Comment[];
}
export interface Comment extends Pick<CommentInfo,'id'|'date'|'md_content'|'inform_list'>{
    author_id       :UserInfo['id'] & CommentInfo['author_id'];
    author_nickname :UserInfo['nickname'];
    comment_list    :Omit<Comment,'comment_list'>[];
}
export const enum ArticleStatus{
    Publish =0,
    Private =1,
    Trash   =2,
}
