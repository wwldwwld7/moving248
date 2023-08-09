import RenderPartnerSignUpForm from '../../components/SignUp/RenderPartnerSignUpForm';
import ImgBox from '../../components/ImgBox/ImgBox';

const PartnerSignUp = props => {
    return (
        <div>
            <ImgBox imgSrc='partner' imgTitle='파트너 회원가입' />
            <RenderPartnerSignUpForm />
        </div>
    );
};

export default PartnerSignUp;
