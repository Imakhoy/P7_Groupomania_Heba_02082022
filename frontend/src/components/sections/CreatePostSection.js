import '../../style/buttons/SectionButton.css';
import '../../style/CreatePostSection.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';



function CreatePostSection () {

    const naviguate = useNavigate();

    function postRequest () {

        let stockedUserId = localStorage.getItem("userId");
        let userId = JSON.parse(stockedUserId);

        let stockedToken = localStorage.getItem("token");
    
        let date = Date();

        let usersLiked = [];

       
        const formData = new FormData();
        formData.append('post', JSON.stringify({'postText' :postText, 'userId' : userId, 'usersLiked' : usersLiked,'date' : date}));
        formData.append('image',  postImage[0] );

        fetch("http://localhost:4200/api/posts", {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer' + ' ' + JSON.stringify(JSON.parse(stockedToken)), 
                },
            body: formData
            })
            .then ( (response) => {
                if (response.status===201) {
                    alert ("Votre poste a bien été publié")
                    naviguate("/HomePage");
                }
            }
            )
            .catch ((error) => console.log(error))
    } 


   
    let [postText, setInputTextlValue] = useState("");
    let [postImage, setInputImageValue] = useState("");

    return <div className='createPostSection'>
        <div className='inputCreatePost'>
            <h1 className='titleInput'>Texte :</h1>
            <textarea className='input'onChange={(event) => setInputTextlValue(event.target.value)}></textarea>
        </div>
        <div className='imgPost'>
            <label className='addImage' htmlFor="avatar">Ajouter une image :</label>
            <input type="file"
                id="avatar" name="avatar"
                accept="image/png, image/jpeg, image/jpg" onChange={(event) => setInputImageValue(event.target.files)}/>
        </div>
        <button className='sectionButton publishButton' type='button' onClick={postRequest}>
            Publier
        </button>
    </div>
}

export default CreatePostSection