import ModifyButton from "../buttons/ModifyButton";
import DeleteButton from "../buttons/DeleteButton";
import '../../style/homePost/FooterButtons.css'

function FooterButtons () {
    return <div className="footerButtons">
        <ModifyButton />
        <DeleteButton />
    </div>
}

export default FooterButtons