import { Helmet } from 'react-helmet-async';
import ImgBox from '../../components/ImgBox/ImgBox';
import RenderMoverSignUpForm from '../../components/SignUp/RenderMoverSignUpForm';

const MoverSignUp = props => {
    return (
        <div>
            <Helmet>
                <title>248 | 신규 회원가입</title>
            </Helmet>
            <ImgBox imgSrc='fam2' imgTitle='신규 회원가입' />
            <RenderMoverSignUpForm />
        </div>
    );
};

export default MoverSignUp;
