/**
 * App Config
 */

export const AUTH_SCHEME = 'Bearer ';
export const ACCESS_TOKEN_KEY = 'et';
export const REFRESH_TOKEN_KEY = 'ert';


/**
 * Shared
 */

export const VALIDATION_REGEX = {
    phone: /^[+]?(?=(?:[^\dx]*\d){7})(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?)(?:[ -]?(?:\(\d+(?:\.\d+)?\)|\d+(?:\.\d+)?))*(?:[ ]?(?:x|ext)\.?[ ]?\d{1,5})?$/,
    email: /^[a-zA-Z0-9_\.]{3,32}@[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,4}){1,2}$/,
    postCode: /^(\d{4})$/
};
