import React from 'react';
import Layout from './layout';

// const style_accueil = {
//     container: {
//         backgroundImage: 'url("./images/city-ravi-patel.jpg")',
//         opacity: '0.6',
//         height: '60rem',
//         width: '100%',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         backgroundSize: 'cover',
//         backgroundAttachment: 'fixed',
//     }
// }

class Accueil extends React.Component {
    render() {
        return (
            <Layout>
                <main className="container_accueil">
                    {/* <div className="container_bg_img" style={style_accueil.container}></div> */}
                    <div className="container_accueil_titre">
                        <p>Bienvenue sur le tchat de GROUPOMANIA</p>
                    </div>
                </main>
            </Layout>
        )

    }
}

// class Intro_accueil extends React.Component{
//     render(){
//         return (
//             <div className="container_accueil_titre">
//                     <p>Bienvenue sur le tchat de GROUPOMANIA</p>
//                 </div>
//         )
//     }
// }

// export default Intro_accueil;
export default Accueil;