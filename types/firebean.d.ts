export const enum Type{
    setStorage    ='set_storage',
    removeStorage ='remove_storage',
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
export type Data =SetStorageData|RemoveStorageData;
