import '../../style/buttons/HeaderButton.css';
import {Link} from 'react-router-dom';

function AddPostButton () {
    return <Link to="/CreatePostPage">
        <button className='headerButton' type="button" >
            Ajouter un post
        </button>
    </Link>
}

export default AddPostButton