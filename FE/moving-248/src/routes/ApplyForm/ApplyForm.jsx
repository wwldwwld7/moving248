import ImgBox from '../../components/ImgBox/ImgBox';
import ApplyFormInput from '../../components/ApplyForm/ApplyFormInput';
import { Helmet } from 'react-helmet-async';

const ApplyForm = props => {
    return (
        <div>
            <Helmet>
                <title>248 | 신청서 작성</title>
            </Helmet>
            <ImgBox imgSrc='apply-form' imgTitle='신청서 작성' />
            <div>
                <ApplyFormInput />
            </div>
        </div>
    );
};

export default ApplyForm;
