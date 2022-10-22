import '../style/Footer.css';
import logo from '../assets/logo.png';


function Footer () {
    return <footer className='footer'>
        <img src={logo} alt="logo Groupomania" className='logoFooter' />
        <p className='textFooter'>Première version du réseau social d'entreprise de Groupomania.</p>
    </footer>
}

export default Footer