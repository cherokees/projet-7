export function convertDate(paraStr) {
    paraStr = paraStr.split("T");
    let date = paraStr[0];
    let horaire = paraStr[1].split(".");
    horaire = horaire[0];

    horaire = horaire.split(":");
    let time = horaire[0];
    let minute = horaire[1];

    date = date.split("-");
    let year = date[0];
    let month = date[1];
    let day = date[2];

    // return ("posté le " + day + "-" + month + "-" + year + " " + "à " + time + "h " + minute + "mn ");
    return (day + "-" + month + "-" + year + " " + "à " + time + "h " + minute + "mn ");
};

