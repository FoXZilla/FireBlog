import {DataString} from "./common";

export interface UserRaw{
    id          :number;
    origin      :string;//OAuth ID
    open_id     :string;
    nickname    :string;
    mail       ?:string;
    avatar     ?:{
        [resolution:number]:string
    };
    create_date :DataString;
}
export interface UserInfo extends Pick<UserRaw,
    'id'
    |'nickname'
    |'create_date'
>{
    avatar:string;
}
