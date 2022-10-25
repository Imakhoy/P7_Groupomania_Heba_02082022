import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function SignupForm() {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usersData = useSelector((state) => state.users.users);

  const passwordError = document.querySelector("#password-error");
  const error = document.querySelector("#error");

  const handleRegister = (e) => {
    e.preventDefault();

    if (error) {
      error.innerHTML = "";
    }
    if (passwordError) {
      passwordError.innerHTML = "";
    }
    
    else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/users/signup`,
        data: {
          lastName,
          firstName,
          email,
          password,
        },
      })
        .then(() => {
          alert("Enregistrement terminé, vous pouvez vous connecter");
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
          formError();
        });
    }
  };

  const formError = () => {
    const userEmail = usersData.map((user) => user.email);

    if (
      lastName === "" ||
      firstName === "" ||
      email === "" ||
      password === ""
    ) {
      error.innerHTML = "Tous les champs sont obligatoires";
    } else if (userEmail.includes(email)) {
      error.innerHTML = "Adresse email déjà utilisée";
    } else {
      passwordError.innerHTML =
        "Les mot de passe doit contenir au minimum 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et il ne doit pas contenir d'espaces ou plus de 100 caractères  ";
    }
  };

  return (
    <div className="logForm">
      <h1>Inscription</h1>
      <form action="" onSubmit={handleRegister} id="sign-up-form">
        <div id="error" className="error"></div>
        <div className="input-bloc">
          <label htmlFor="lastName">Nom :</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </div>
        <br />
        <div className="input-bloc">
          <label htmlFor="firstName">Prénom :</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </div>
        <br />
        
        <br />
        <div className="input-bloc">
          <label htmlFor="email">Email :</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <br />
        <div className="input-bloc">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <br />
        
        <div id="password-error" className="error"></div>
        <br />
        <div className="log-btn-bloc">
          <input className="log-btn" type="submit" value="S'inscrire" />
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
