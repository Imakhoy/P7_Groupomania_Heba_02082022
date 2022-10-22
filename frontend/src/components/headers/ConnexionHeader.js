import '../../style/headers/ConnexionHeader.css';
import logo from '../../assets/logo.png'

function ConnexionHeader() {
	return <header className='connexionHeader'>
		<img src={logo} alt="logo Groupomania" className='logoConnexionHeader' />
	</header>
}

export default ConnexionHeader