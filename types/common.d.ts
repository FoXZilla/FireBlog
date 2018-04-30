

/**
 * @typedef {string} AliasString
 * Conform to /^[a-z\-_]+$/
 * */
export type AliasString  =string;
/**
 * @typedef {string} DataString
 * Conform as new Date().toISOString()
 * */
export type DataString =string;


// Utils

export type ToString<T> =string;
export type IndexMap<K extends string ,V> ={
    [key in K] :V;
};
export type Diff<T extends string, U extends string> = ({[P in T]: P } & {[P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
