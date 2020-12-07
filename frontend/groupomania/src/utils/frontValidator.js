export const VLD_NOT_NULL = 0;
export const VLD_IS_NUMBER = 1;
export const VLD_IS_STRING = 2;
export const VLD_NOT_EMPTY_STRING = 3;
export const VLD_NO_SPECIAL_CHARS = 4;
export const VLD_IS_EMAIL = 5;

//Fonction de vérification des caractères spéciaux

function hasSpecialChars(value, allowed = []) {
    const checks = [];
    checks.push(/[`!#$%^&*()+\=\[\]{};':"\\|,<>\/?~]/);
    if (!allowed.includes('@')) checks.push(/[@]/);
    if (!allowed.includes('-')) checks.push(/[-]/);
    if (!allowed.includes('_')) checks.push(/[_]/);
    if (!allowed.includes('.')) checks.push(/[.]/);
    if (!allowed.includes(' ')) checks.push(/[ ]/);

    let result = false;
    checks.forEach((rgx) => {
        if (rgx.test(value)) {
            result = true;
        }
    });
    return result;
}

//Fonction de vérification de l'adresse email

function isValidEmail(value) {
    if (/\S+@\S+\.\S+/.test(value) && !hasSpecialChars(value, ['.', '@'])) { //comparaison des caractères de l'adresse mail avec ce qui est attendu
        return true;
    }
    return false;
}

//

function getValidationReport(targetObj, fields) {
    const report = {};

    Object.entries(fields).forEach(([key, vldTypes]) => {
        const value = targetObj[key]; // Prend la valeur de l'objet à examiner
        const requiredCheck = Object.prototype.hasOwnProperty.call(targetObj, key); // Vérifie que l'objet a cette clé
        const notNullCheck = value !== null; // Vérifie que la valeur n'est pas égale à null
        const isNumberCheck = !isNaN(parseFloat(value)) && isFinite(value); // Vérifie que la valeur est un nombre
        const isStringCheck = typeof value === 'string'; // Vérifie que la valeur est un string
        const notEmptyStringCheck = value !== ''; // Vérifie que la valeur n'est pas un string vide
        const noSpecialCharsCheck = !hasSpecialChars(value);
        const isEmailCheck = isValidEmail(value);

        if (!requiredCheck) {
            // report.push(`Paramètre manquant : ${key}`);
            report[key] = "Paramètre manquant";

        } else if (vldTypes.includes(VLD_NOT_NULL) && !notNullCheck) {
            // report.push(`Paramètre nul : ${key}`);
            report[key] = "Paramètre nul";

        } else if (vldTypes.includes(VLD_IS_NUMBER) && !isNumberCheck) {
            // report.push(`Mauvais type : ${key} [got ${typeof value}]`);
            report[key] = `Mauvais type : [got ${typeof value}]`;

        } else if (
            (
                vldTypes.includes(VLD_IS_STRING)
                || vldTypes.includes(VLD_NOT_EMPTY_STRING)
                || vldTypes.includes(VLD_IS_EMAIL)
            )
            && !isStringCheck) {
            // report.push(`Mauvais type : ${key} [got ${typeof value}]`);
            report[key] = `Mauvais type : [got ${typeof value}]`;

        } else if (vldTypes.includes(VLD_NOT_EMPTY_STRING) && !notEmptyStringCheck) {
            // report.push(`Paramètre vide : ${key}`);
            report[key] = "Texte vide";

        } else if (vldTypes.includes(VLD_NO_SPECIAL_CHARS) && !noSpecialCharsCheck) {
            // report.push(`Caractères interdits : ${key}`);
            report[key] = "Caractères interdits";

        } else if (vldTypes.includes(VLD_IS_EMAIL) && !isEmailCheck) {
            // report.push(`L'adresse e-mail n'est pas valide : ${key}`);
            report[key] = "L'adresse e-mail n'est pas valide";
        }
    });

    return report;
}


export function validateSubmit(body, fields) {
    // Obtenir un rapport du validateur
    return getValidationReport(body, fields);
}


// export function validateFieldsPOST(fields) {
//     return (req, res, next) => {
//         // Obtenir un rapport du validateur
//         const report = getValidationReport(req.body, fields);
//         if (report.length === 0) {
//             // Si le rapport est vide, on continue comme avant
//             next();
//         } else {
//             // Si le rapport du validateur n'est pas vide, renvoyer une erreur 
//             res.status(400).json({ message: `Erreurs de paramètres : ${report.join(', ')}.` });
//         }
//     }
// }