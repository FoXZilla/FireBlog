import {CommentInfo} from "./comment";
import {ArticleInfo} from "./article";
import {UserInfo} from "./user";

export const enum Type{
    setStorage    ='set_storage',
    removeStorage ='remove_storage',
    goComment     ='go_comment',
    goArticle     ='go_article',
    goUser        ='go_user',
}
export interface DataCommon{
    _type      :Type;
    _version   :string;
    _firebean ?:'1';
    _redirect ?:string;// '/' by default
    _close    ?:'1';
}
export interface SetStorageData extends DataCommon{
    _type:Type.setStorage;
    key  :string;
    value:string;
}
export interface RemoveStorageData extends DataCommon{
    _type :Type.removeStorage;
    key   :string;
}
export interface GoArticleData extends DataCommon,Pick<ArticleInfo,'id'|'state'>{
    _type :Type.goArticle;
}
export interface GoCommentData extends DataCommon,Pick<CommentInfo,'id'|'article_id'|'author'|'reply_to'>{
    _type :Type.goComment;
}
export interface GoUserData extends DataCommon,Pick<UserInfo,'id'>{
    _type :Type.goUser;
}
export type Data =SetStorageData|RemoveStorageData|GoArticleData|GoCommentData|GoUserData;
