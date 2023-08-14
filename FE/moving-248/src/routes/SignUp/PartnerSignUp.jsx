import RenderPartnerSignUpForm from '../../components/SignUp/RenderPartnerSignUpForm';
import ImgBox from '../../components/ImgBox/ImgBox';
import { Helmet } from 'react-helmet-async';

const PartnerSignUp = props => {
    return (
        <div>
            <Helmet>
                <title>248 | 파트너 회원가입</title>
            </Helmet>
            <ImgBox imgSrc='partner' imgTitle='파트너 회원가입' />
            <RenderPartnerSignUpForm />
        </div>
    );
};

export default PartnerSignUp;
