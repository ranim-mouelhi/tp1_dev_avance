/**
 * @description Definie la variable pour le hash du premier bloc
 * @type {string}
 */
export const monSecret = "";

/**
 * @description Retourne un timestamp au format aaaammjj-hh:mm:ss
 * @return {string}
 */
export function getDate() {
    const now = new Date();

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');


    return `${year} - ${month} - ${day}`;
}
