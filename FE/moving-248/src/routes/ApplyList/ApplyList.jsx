import { Helmet } from 'react-helmet-async';
import ApplyList from '../../components/ApplyList/ApplyList';
import ImgBox from '../../components/ImgBox/ImgBox';

export default function ApplyListPage() {
    return (
        <div>
            <Helmet>
                <title>248 | 신청서 목록</title>
            </Helmet>
            <ImgBox imgSrc='apply-list3' imgTitle='신청서 목록' />

            <ApplyList />
        </div>
    );
}
