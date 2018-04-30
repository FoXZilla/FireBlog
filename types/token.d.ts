import {UserInfo} from "./index";
import {DataString} from "./common";


export type Token =string;
export interface TokenInfo{
    user_id :UserInfo['id'];
    token   :string;
    age     :DataString;
}
