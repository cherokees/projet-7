import React from 'react';

//const/objet qui contient le CSS permanent au composant footer

const styles_footer = {
    container: {
        width: '100%',
        height: '12rem',
        bottom: '0',
    }
}

//fonction getCurrentDate qui affiche la date dynamiquement

export function getCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

//Composant pied de page présent sur l'ensemble du site

class Footer extends React.Component {

    render() {
        return (
            <div className="container_footer" style={styles_footer.container}>
                <div className="date_footer">
                    <p>Date : {getCurrentDate('-')}</p>
                </div>
                <div className="juridiction_footer">
                    <p>Juridiction</p>
                </div>
            </div>
        )
    }
}

export default Footer;