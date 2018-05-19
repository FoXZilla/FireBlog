import {AliasString} from "./common";


export interface CategoryRaw{
    name         :string;
    alias        :AliasString;
    description  :string;
    parent_alias?:AliasString;
}
/**
 * A Category.
 * @typedef {Object} CategoryInfo
 * @property {string}               name - The name of category
 * @property {AliasString}        alias - The name of category  stand in the program, to be used as identifier
 * @property {AliasString|null}   parent_alias - The alias of parent of this category.
 * @property {AliasString[]}      child_alias_list  - The aliases of children of this category.
 * */
export interface CategoryInfo extends Pick<CategoryRaw,
    'name'
    |'alias'
    |'description'
    |'parent_alias'
>{

}
