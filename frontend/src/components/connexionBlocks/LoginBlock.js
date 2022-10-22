import '../../style/buttons/SectionButton.css';
import '../../style/ConnexionForms.css';
import '../../style/ConnexionBlock.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function LoginBlock () {
    const naviguate = useNavigate();

    function postRequest () {
        fetch("http://localhost:4200/api/auth/login", {
            method: 'POST',
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
            },
            body: JSON.stringify ({password, email} )
            })
            .then(response => response.json())
            .then(json => {
                if (json.userId) {
                    naviguate("/HomePage");
                    let stockedUserId = JSON.stringify(json.userId);  
                    localStorage.setItem("userId",stockedUserId);  
                    let stockedToken = JSON.stringify(json.token);  
                    localStorage.setItem("token",stockedToken); 
                 } else {
                     alert('Combinaison email / mot de passe incorrecte')
                 } 
            })
            .catch ((error) => console.log(error))
    } 

    let [email, setInputEmailValue] = useState("")

    let [password, setInputPasswordValue] = useState("")

    return <div className='connexionBlock'>
        <h1 className='blockTitle loginBlockTitle'>Se connecter</h1>
        <div className='connexionForm'>
            <p className='connexionText'>Email  :</p>
            <input className='connexionInput' onChange={(event) => setInputEmailValue(event.target.value)}/>
        </div>
        <div className='connexionForm'>
            <p className='connexionText'>Mot de passe  :</p>
            <input type='password' className='connexionInput' onChange={(event) => setInputPasswordValue(event.target.value)}/>
        </div>
        <button className='sectionButton loginButton' type='button' onClick={postRequest}>
            Se connecter
        </button>
    </div>
}

export default LoginBlock
