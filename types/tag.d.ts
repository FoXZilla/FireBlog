import {AliasString} from "./index";


export interface TagRaw{
    name        :string;
    alias       :AliasString;
    description :string;
}
/**
 * A tag.
 * @typedef {Object} TagInfo
 * @property {string} name - The name of tag.
 * @property {AliasString} alias - The name of tag stand in the program, to be used as identifier.
 * */
export interface TagInfo extends Pick<TagRaw,
    'name'
    |'alias'
    |'description'
>{
    count:number;
}
