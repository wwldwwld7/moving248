import ImgBox from '../../components/ImgBox/ImgBox';
import ApplyFormInput from '../../components/ApplyForm/ApplyFormInput';

const ApplyForm = props => {
    return (
        <div>
            <ImgBox imgSrc='moving-box' imgTitle='신청서 작성' />
            <div>
                <ApplyFormInput />
            </div>
        </div>
    );
};

export default ApplyForm;
