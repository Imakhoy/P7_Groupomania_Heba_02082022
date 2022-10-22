import '../../style/headers/HomeAndCreatePostHeader.css';
import logo from '../../assets/logo.png';
import AddPostButton from '../buttons/AddPostButton';
import HomeButton from '../buttons/HomeButton';
import LogoutButton from '../buttons/LogoutButton';
import LoginButton from '../buttons/LoginButton';


function HomeAndCreatePostHeader() {
	return <header className='homeAndCreatePostHeader'>
		<div>
            <HomeButton />
            <AddPostButton />   
        </div>
		<img src={logo} alt="logo Groupomania" className='logoHeader' />
        <div>
            <LoginButton />
            <LogoutButton />
        </div>
	</header>
}

export default HomeAndCreatePostHeader