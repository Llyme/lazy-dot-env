import dotenv from 'dotenv';

const NO_FIELD_ERROR = "Missing environment field '{0}'!";

/**
 * 
 * @param {import('dotenv').DotenvConfigOptions} options 
 * @returns {import('dotenv').DotenvConfigOutput}
 */
export function config(options = undefined) {
    return dotenv.config(options);
}

/**
 * 
 * @param {string} key 
 * @param {*} defaultValue 
 */
export function get(key, defaultValue = undefined) {
    if (key in process.env)
        return process.env[key];

    if (defaultValue === undefined)
        throw new Error(NO_FIELD_ERROR.replace('{0}', key));

    return defaultValue;
}

/**
 * 
 * @param {string} key 
 * @param {number} defaultValue 
 */
export function float(key, defaultValue = undefined) {
    if (!(key in process.env))
        if (defaultValue === undefined)
            throw new Error(NO_FIELD_ERROR.replace('{0}', key));
        else
            return defaultValue;

    const value = parseFloat(process.env[key]);

    if (isNaN(value))
        if (defaultValue === undefined)
            throw new Error(NO_FIELD_ERROR.replace('{0}', key));
        else
            return defaultValue;

    return value;
}

/**
 * 
 * @param {string} key 
 * @param {number} defaultValue 
 */
export function int(key, defaultValue = undefined) {
    if (!(key in process.env))
        if (defaultValue === undefined)
            throw new Error(NO_FIELD_ERROR.replace('{0}', key));
        else
            return defaultValue;

    const value = parseInt(process.env[key]);

    if (isNaN(value))
        if (defaultValue === undefined)
            throw new Error(NO_FIELD_ERROR.replace('{0}', key));
        else
            return defaultValue;

    return value;
}

/**
 * 
 * @param {string} key 
 * @param {boolean} defaultValue 
 */
export function bool(key, defaultValue = undefined) {
    if (!(key in process.env))
        if (defaultValue === undefined)
            throw new Error(NO_FIELD_ERROR.replace('{0}', key));
        else
            return defaultValue;

    let text = process.env[key];

    if (text == null)
        if (defaultValue === undefined)
            throw new Error(NO_FIELD_ERROR.replace('{0}', key));
        else
            return defaultValue;

    text = text.trim().toLowerCase();

    const padding = getBoolPadding(text);

    if (padding > 0)
        text = text.slice(padding, -padding);

    switch (text) {
        case 'true':
            return true;

        case 'false':
            return false;
    }

    if (defaultValue === undefined)
        throw new Error(NO_FIELD_ERROR.replace('{0}', key));

    return defaultValue;
}

/**
 * 
 * @param {string} text 
 */
function getBoolPadding(text) {
    for (const padding of ['"', "'", '`'])
        if (text.startsWith(padding) && text.endsWith(padding))
            return padding.length;

    return 0;
}