import {ApiErrorResponse,UserRaw, ApiSuccessResponse, CategoryInfo, CommentInfo, IndexMap, Omit, ArticleInfo, TagInfo, ToString, UserInfo} from "./index";
import {Token ,TokenInfo} from "./token";
import FireBlogData ,{BlogInfo} from "./export";


/*
    GET   /oauth/login/:oauth_id
    GET   /oauth/callback/:oauth_id
    HEAD  /oauth/logout
    GET   /oauth/logout
    GET   /oauth/ping

    GET   /category/all
    GET   /tag/all
    GET   /article/all
    GET   /article/search?tag=&category=
    GET   /article/grow_view_count/:article_id
    GET   /article/detail/:article_id?password=&prevent_view_count=

    POST  /user/update_info
    GET   /user/avatar/:user_id?size=40
    GET   /user/info/:user_id
    GET   /user/search?word=

    POST  /comment/create
    GET   /comment/remove/:common_id

    GET   /blog/info
    GET   /fireblog
*/

export namespace Get{
    export namespace oauth{
        export namespace login.$oauth_id{
            export type response =void;
            export type call      =(oauth_id:string)=>void;
            export type asyncCall =(oauth_id:string)=>void;
        }
        export namespace callback.$oauth_id{
            export interface query{
                code :string;
                state:string;
            }
            export const enum Storage{Key ='fireblog.oauth.login'}
            export interface StorageValue extends TokenInfo{// Storage.Key
            }
            export interface CookieValue{
                token:Token;
            }
            export type response =void;
            export type call      =(oauth_id:string)=>void;
            export type asyncCall =(oauth_id:string)=>void;
        }
        export namespace ping{
            export interface response extends
                ApiSuccessResponse,
                Get.oauth.callback.$oauth_id.StorageValue
            {}
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
        export namespace logout{
            export type response =void;
            export type call      =()=>void;
            export type asyncCall =()=>void;
        }
    }
    export namespace category{
        export namespace all{
            export interface response extends ApiSuccessResponse{
                category_length:number;
                category_map   :IndexMap<CategoryInfo['alias'],CategoryInfo>;
            }
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
    }
    export namespace tag{
        export namespace all{
            export interface response extends ApiSuccessResponse{
                tag_length:number;
                tag_map   :IndexMap<TagInfo['alias'],TagInfo>;
            }
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
    }
    export namespace article{
        export namespace all{
            export interface response extends ApiSuccessResponse{
                article_length:number;
                article_map :IndexMap<
                    ToString<ArticleInfo['id']>,
                    Omit<ArticleInfo,'md_content'|'comment_list'>
                >;
            }
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
        export namespace search{
            export interface query{
                tag     ?:(TagInfo['alias'])[];
                category?:(CategoryInfo['alias'])[];
                keyword ?:string;
            }
            export interface response extends Get.article.all.response{}
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
        export namespace detail.$article_id{
            // The comment of article sort is order by it last update time.
            // sync "grow_view_count" module when there been changed
            export interface response extends ApiSuccessResponse,ArticleInfo{}
            export interface query{
                password ?:string;
                prevent_view_count ?:'1';
            }
            export type call      =(article_id:ArticleInfo["id"]) =>        response|ApiErrorResponse|NeedPasswordResponse;
            export type asyncCall =(article_id:ArticleInfo["id"]) =>Promise<response|ApiErrorResponse|NeedPasswordResponse>;
        }
        export namespace grow_view_count.$article_id{
            export interface query{
                password ?:string;
            }
            export interface response extends
                ApiSuccessResponse,
                Pick<ArticleInfo,'view_count'>
            {}
            export type call      =(article_id:ArticleInfo["id"]) =>        response|ApiErrorResponse|NeedPasswordResponse;
            export type asyncCall =(article_id:ArticleInfo["id"]) =>Promise<response|ApiErrorResponse|NeedPasswordResponse>;
        }
    }
    export namespace user{
        export namespace avatar.$user_id{
            export interface query{
                size ?:string,// 40 by default
            }
            export type response =void;
            export type call      =(user_id:UserInfo['id'])=>void;
            export type asyncCall =(user_id:UserInfo['id'])=>void;
        }
        export namespace info.$user_id{
            export interface response extends ApiSuccessResponse,UserInfo{
                mail ?:UserRaw['mail']; // only exist in that get self info
            }
            export type call      =(user_id:UserInfo['id'])=>        response|ApiErrorResponse;
            export type asyncCall =(user_id:UserInfo['id'])=>Promise<response|ApiErrorResponse>;
        }
        export namespace search{
            export interface query{
                word ?:UserInfo['nickname'];
            }
            export interface response extends ApiSuccessResponse{
                user_list :UserInfo[];
            }
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
    }
    export namespace comment{
        export namespace remove{
            export interface response extends ApiSuccessResponse,CommentInfo{}
            export type call      =(comment_id:CommentInfo["id"]) =>        response|ApiErrorResponse;
            export type asyncCall =(comment_id:CommentInfo["id"]) =>Promise<response|ApiErrorResponse>;
        }
    }
    export namespace blog{
        export namespace info{
            export interface response extends ApiSuccessResponse, BlogInfo{}
            export type call      =() =>        response;
            export type asyncCall =() =>Promise<response>;
        }
    }
    export namespace fireblog{
        export namespace version{
            export interface response extends ApiSuccessResponse{
                version :string;
            }
            export type call      =() =>        response;
            export type asyncCall =() =>Promise<response>;
        }
    }
}
export namespace Post{
    export namespace comment{
        export namespace create{
            export interface request{
                article_id  :ArticleInfo['id'];
                md_content  :string;
                reply_to   ?:CommentInfo['id'];
            }
            export interface response extends ApiSuccessResponse,CommentInfo{}
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
    }
    export namespace user{
        export namespace update_info{
            export interface response extends ApiSuccessResponse,request{}
            export interface request extends Partial<Pick<UserRaw,'nickname'>>{
                mail :UserRaw['mail']|null;
            }
            export type call      =()=>        response|ApiErrorResponse;
            export type asyncCall =()=>Promise<response|ApiErrorResponse>;
        }
    }
}

export interface Cookie extends
    Partial<Get.oauth.callback.$oauth_id.CookieValue>
{}
export interface Storage extends
    Partial<Get.oauth.callback.$oauth_id.StorageValue>
{}


/**
 * The minimize response of APIs.
 * @typedef {Object} ApiResponse
 * @property {Errcode} errcode - The state of request.
 * @property {string}  errmsg  - The message for debugging.
 * */
export interface ApiResponse{
    errcode :Errcode;
    errmsg  :string;
}
/**
 * Like ApiResponse, but be limited in the case when some errors have occurred.
 * @typedef {Object} ApiErrorResponse
 * */
export interface ApiErrorResponse extends ApiResponse{
    errcode :ErrorErrcode;
}
export interface ApiSuccessResponse extends ApiResponse{
    errcode :SuccessErrcode;
}
export interface NeedPasswordResponse extends ApiErrorResponse{
    errcode       :Errcode.IncorrectPassword;
    password_hint?:string;
}

/**
 * The map of all case of ApiResponse.errcode.
 * @typedef {object} Errcode
 * */
export const enum Errcode{
    Ok=0,
    Error=1,
    // some not found
    ArticleNotFound=201,
    TagNotFound=202,
    CategoryNotFound=203,
    CommentNotFound=204,
    UserNotFound=205,
    // field validate
    Nickname=301,
    Mail=302,
    // other
    NeedToken=401,
    TokenTimeout=402,
    AccessDeny =403,
    IncorrectPassword =404,
}
/**
 * All success case of ApiResponse.errcode.
 * @typedef {number} SuccessErrcode
 * */
export type SuccessErrcode =Errcode.Ok;
/**
 * All fail case of ApiResponse.errcode.
 * @typedef {number} SuccessErrcode
 * */
export type ErrorErrcode=// all of Errcode except SuccessErrcode
    Errcode.Error
    | Errcode.TagNotFound
    | Errcode.ArticleNotFound
    | Errcode.CategoryNotFound
    | Errcode.UserNotFound
    | Errcode.NeedToken
    | Errcode.TokenTimeout
    | Errcode.Nickname
    | Errcode.Mail
    | Errcode.IncorrectPassword
    | Errcode.AccessDeny
    | Errcode.CommentNotFound
;
