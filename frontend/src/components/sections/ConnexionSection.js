import LoginBlock from "../connexionBlocks/LoginBlock";
import SignUpBlock from "../connexionBlocks/SignUpBlock";
import '../../style/ConnexionSection.css'

function ConnexionSection () {
    return <section className="connexionSection">
        <LoginBlock />
        <SignUpBlock />
    </section>
}

export default ConnexionSection