import React from 'react';

const styles_footer = {
    container: {
        width: '100%',
        height: '12rem',
        bottom: '0',
    }
}

export function getCurrentDate(separator = '') {

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

class Footer extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
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