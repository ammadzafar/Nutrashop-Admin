import {React,Component} from 'react';
import Card from '../../../components/Card/Card'
import ForgotPasswordForm from "./ForgotPassword";
class ForgotPassword extends Component{
render() {
    return (
        <Card title="Forgot Password">
            <ForgotPasswordForm/>
        </Card>
    )
}
}

export default ForgotPassword
