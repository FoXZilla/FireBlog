import {CategoryRaw ,TagRaw ,ArticleRaw ,UserRaw ,CommentRaw ,ArticleInfo} from "./index";
import {TagInfo} from "./tag";
import {CategoryInfo} from "./category";
import {IndexMap ,Omit} from "./common";


export type Base64 =string;
export type URL    =string;

export type NavConfig =TagNavConfig|CategoryNavConfig|LinkNavConfig|ArticleNavConfig;
export interface TagNavConfig{
    type :'tag';
    alias:TagInfo['alias'];
    text?:string;
}
export interface CategoryNavConfig{
    type :'category';
    alias:CategoryInfo['alias'];
    text?:string;
}
export interface LinkNavConfig{
    type :'link';
    href :URL;
    text :string;
}
export interface ArticleNavConfig{
    type :'article';
    id   :ArticleInfo['id'];
    text :string;
}

export interface BlogInfo{
    name         :string;
    api_url      :URL;// https://localhost:3002 by default
    front_url    :URL;// https://localhost:3003 by default
    publish_date?:string;
    description ?:string;
    language    ?:string;// en by default
    token_age_s ?:number;// 1s*60*60*20*7 by default
    copyright   ?:string;

    nav ?:NavConfig[];
    author :{
        names  :string[];
        avatar?:URL;
        mail   :string;
    };
    blogroll?:Array<{
        href :URL;
        text :string;
    }>;
    oauth ?:IndexMap<
        OAuthOption['id'],
        Pick<OAuthOption,'id'|'icon'|'text'>
    >;
    default_avatar ?:{
        [size:number] :URL;
    };
    favicon ?:{
        [size:number] :URL;
    };
}

export interface OAuthOption{
    id            :string;
    icon         ?:URL;
    text         ?:string;

    client_id     :string;
    client_secret :string;
    redirect_uri ?:string;// FireApiUrl/oauth/callback/[id] by default
}

export default interface FireBlogData{
    name            :BlogInfo['name'];
    version         :string;

    meta : Omit<BlogInfo,
        'oauth'
        |'name'
    > & {
        oauth ?:IndexMap<OAuthOption['id'],OAuthOption>;
        mail ?:{
            connect :string;// e.g. smtp://username:password@smtp.example.com
            from    :string;
        };
    };

    data        :{
        tag       :TagRaw[];
        category  :CategoryRaw[];
        article   :ArticleRaw[];
        user      :UserRaw[];
        comment   :CommentRaw[];
        attachment:URL[];
    };
}
