import '../../style/HomeSection.css';
import '../../style/homePost/PostHeader.css';
import '../../style/homePost/PostContent.css';
import test from '../../assets/test.jpg';
import FooterButtons from "../homePost/FooterButtons";
import LikeButton from "../buttons/LikeButton";
import '../../style/homePost/HomePostFooter.css'
import '../../style/homePost/FooterButtons.css';
import '../../style/homePost/HomePost.css'


function FeedHomeSection () {

    function displayAllPosts (posts) {
        let feed = document.getElementById('feed');
        for (let post of posts) {
            feed.insertAdjacentHTML('beforeend',`

            <div className='homePost'>
            <div className='postHeader'>
                <div className='headerInfos'>
                   ${post.date}
                </div>
            </div>
            <div className='postContent'>
                <div className='imageContainer'>
                    <img src=${post.imageUrl} alt = 'post Image' className='imageContent'/>
                </div>
                <div className='texteContent'>
                   ${post.postText}
                </div>
            </div>
            <div className="homePostFooter">
                <FooterButtons />
                <LikeButton />
            </div>
        </div>

            `); 
          } 
    }
    let stockedToken = localStorage.getItem("token");
    
    fetch ("http://localhost:4200/api/posts", {
        headers: { 
            'Authorization': 'Bearer' + ' ' + JSON.stringify(JSON.parse(stockedToken)), 
        },
    })
    .then(response => response.json())
    .then(json => {
        displayAllPosts(json)
    })
    
    return <div className="homeSection" id="feed">
    </div>
}

export default FeedHomeSection