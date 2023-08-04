import { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/header/Header';
import ImgBox from '../../components/ImgBox/ImgBox';
import './ApplyDetail.css';

export default function ApplyDetail() {
    const [apply, setApply] = useState({
        f_id: '1',
        u_id: '2',
        p_id: '3',
        f_category: '포장이사',
        f_date: '2022-08-02',
        f_dep_sido: '3',
        f_dep_gungu: '2',
        f_dep_ev: 'f',
        f_dep_ladder: 't',
        f_arr_sido: '4',
        f_arr_gungu: '5',
        f_arr_ev: 'f',
        f_arr_ladder: 't',
        f_room_video_url: 'cccc',
        f_req_desc: 'fffffff',
        f_status: '입찰중',
    });

    return (
        <div className='apply-detail'>
            <Header />
            <ImgBox imgSrc='moving-box' imgTitle='신청서 상세' />

            <section className='max-container section'>
                <div className='sec-two-one-container inner__section  overlap-imgbox'>
                    <h2 className='sec-two-container__h2'>무버 요청 신청서</h2>

                    <h4 className='sec-two-container__h4'>신청서 상태</h4>
                    <p className='paragraph sec-two-container__paragraph'>{apply.f_status}</p>

                    <h4>이사 종류</h4>
                    <p className='paragraph'>hola</p>
                </div>

                <div className='sec-two-two-container inner__section'>
                    <p>sec-two-one-container</p>
                    <p>sec-two-one-container</p>
                </div>
            </section>

            <Footer />
        </div>
    );
}
