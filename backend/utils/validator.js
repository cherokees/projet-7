export const VLD_NOT_NULL = 0;
export const VLD_IS_NUMBER = 1;
export const VLD_IS_STRING = 2;
export const VLD_NOT_EMPTY_STRING = 3;


function getValidationReport(targetObj, fields) {
    const report = [];

    Object.entries(fields).forEach(([key, vldTypes]) => {
        const value = targetObj[key]; // Prend la valeur de l'objet à examiner
        const requiredCheck = Object.prototype.hasOwnProperty.call(targetObj, key); // Vérifie que l'objet a cette clé
        const notNullCheck = value !== null; // Vérifie que la valeur n'est pas égale à null
        const isNumberCheck = !isNaN(parseFloat(value)) && isFinite(value); // Vérifie que la valeur est un nombre
        const isStringCheck = typeof value === 'string'; // Vérifie que la valeur est un string
        const notEmptyStringCheck = value !== ''; // Vérifie que la valeur n'est pas un string vide

        if (!requiredCheck) {
            report.push(`Paramètre manquant : ${key}`);

        } else if (vldTypes.includes(VLD_NOT_NULL) && !notNullCheck) {
            report.push(`Paramètre nul : ${key}`);

        } else if (vldTypes.includes(VLD_IS_NUMBER) && !isNumberCheck) {
            report.push(`Mauvais type : ${key} [got ${typeof value}]`);

        } else if ((vldTypes.includes(VLD_IS_STRING) || vldTypes.includes(VLD_NOT_EMPTY_STRING)) && !isStringCheck) {
            report.push(`Mauvais type : ${key} [got ${typeof value}]`);

        } else if (vldTypes.includes(VLD_NOT_EMPTY_STRING) && !notEmptyStringCheck) {
            report.push(`Paramètre vide : ${key}`);

        }
    });

    return report;
}

export function validateFieldsPOST(fields) {
    return (req, res, next) => {
        // Obtenir un rapport du validateur
        const report = getValidationReport(req.body, fields);
        if (report.length === 0) {
            // Si le rapport est vide, on continue comme avant
            next();
        } else {
            // Si le rapport du validateur n'est pas vide, renvoyer une erreur 
            res.status(400).json({ message: `Erreurs de paramètres : ${report.join(', ')}.` });
        }
    }
}