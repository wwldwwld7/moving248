import ImgBox from '../../components/ImgBox/ImgBox';
import RenderMoverSignUpForm from '../../components/SignUp/RenderMoverSignUpForm';

const MoverSignUp = props => {
    return (
        <div>
            <ImgBox imgSrc='fam2' imgTitle='신규 회원가입' />
            <RenderMoverSignUpForm />
        </div>
    );
};

export default MoverSignUp;
