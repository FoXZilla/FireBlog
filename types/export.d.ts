import {CategoryRaw, TagRaw, ArticleRaw, UserRaw, CommentRaw} from "./index";


export default interface FireBlogData{
    version         :string;
    api_url         :string;
    front_url       :string;
    token_age_s    ?:number;// 1s*60*60*20*7 by default
    default_avatar ?:{
        [size:number] :string,
    };
    oauth          ?:{
        [OAuthId:string]:{
            redirect_uri ?:string;
            client_id     :string;
            client_secret :string;
            [p:string]    :any;
        };
    };
    data        :{
        tag       :TagRaw[];
        category  :CategoryRaw[];
        article   :ArticleRaw[];
        user      :UserRaw[];
        comment   :CommentRaw[];
        attachment:string[];
    };
}
