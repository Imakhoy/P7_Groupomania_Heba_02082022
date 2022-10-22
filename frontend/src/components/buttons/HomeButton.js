import '../../style/buttons/HeaderButton.css';
import {Link} from 'react-router-dom';

function HomeButton () {
    return <Link to="/HomePage">
    <button className='headerButton' type="button" >
        Voir les posts 
    </button>
</Link>
}

export default HomeButton