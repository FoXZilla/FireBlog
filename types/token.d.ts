import {ResponseDate ,UserInfo} from "./index";


export type Token =string;
export interface TokenInfo{
    user_id :UserInfo['id'];
    token   :string;
    age     :ResponseDate;
}
