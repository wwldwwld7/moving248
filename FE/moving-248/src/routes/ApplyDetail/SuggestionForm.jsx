import React, { useEffect, useState } from 'react';
import InputBox from '../../components/UI/InputBox';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { memberIdAtom } from '../../atom';

export default function SuggestionForm() {
    const { id } = useParams();

    const memberId = useRecoilValue(memberIdAtom);

    const [apply, setApply] = useState({
        f_id: 0,
        u_id: 0,
        p_id: '',
        userName: '',
        f_category: '',
        f_date: '',
        f_dep_sido: '',
        f_dep_gungu: '',
        f_dep_ev: '',
        f_dep_ladder: '',
        f_arr_sido: '',
        f_arr_gungu: '',
        f_arr_ev: '',
        f_arr_ladder: '',
        f_room_video_url: '',
        f_req_desc: '',
        f_status: 0,
    });

    const [isNew, setIsNew] = useState(true);

    const [mySuggestion, setMySuggestion] = useState({
        s_money: 0,
        s_desc: '',
    });

    const [formData, setFormData] = useState({
        s_money: '',
        s_desc: '',
    });

    const getData = () => {
        axios
            .get(`/form/${id}`)
            .then(res => {
                const importData = { ...res.data.data };

                const newDesc = res.data.data.f_req_desc.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ));
                res.data.data.f_req_desc = newDesc;
                setApply({ ...importData }); // Update apply state

                const filteredSuggestions = importData.list.filter(element => element.p_id === memberId);
                if (filteredSuggestions.length > 0) {
                    console.log(filteredSuggestions[0]);
                    setIsNew(false);
                    setMySuggestion({
                        s_desc: filteredSuggestions[0].s_desc,
                        s_money: filteredSuggestions[0].s_money,
                    });
                }
            })
            .catch(error => {
                console.log('Error:', error);
            });
    };

    useEffect(() => {
        getData();
    }, [id, memberId]);

    useEffect(() => {
        setFormData({
            s_desc: mySuggestion.s_desc,
            s_money: mySuggestion.s_money,
        });
    }, [mySuggestion]);

    const changeHandler = e => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        // console.log('견적' + formData.s_money);
    };

    const submitHandler = e => {
        e.preventDefault();

        const data = {
            p_id: memberId,
            s_money: Number(formData.s_money),
            s_desc: formData.s_desc,
        };

        console.log(`[Suggestion Form] s_money : ${data.s_money}`);
        if (isNaN(data.s_money)) {
            alert('올바른 가격을 입력해주세요.');
            return;
        }

        if (data.s_money <= 0 || data.s_money >= 100000000) {
            alert('올바르지 않은 가격을 작성하였습니다. (ex. 1~100,000,000 이내)');
            return;
        }

        if (data.s_desc === '') {
            alert('상세 설명을 작성해 주세요.');
            return;
        }

        // 신규 등록이면
        if (isNew === true) {
            axios
                .post(`/form/suggestion/${id}`, data)
                .then(res => {
                    alert('견적이 등록되었습니다.');
                    window.location.reload();
                })
                .catch(error => {
                    alert('견적 등록 중 에러가 발생하였습니다.');
                    console.log('견적등록 error : ' + error);
                });
        }

        // 수정 이면
        else {
            axios
                .put(`/form/suggestion/${id}`, data)
                .then(res => {
                    alert('견적이 수정되었습니다.');
                    window.location.reload();
                })
                .catch(error => {
                    alert('견적 수정 중 에러가 발생하였습니다.');
                    console.log('견적 수정 error : ' + error);
                });
        }
    };

    const onDeleteHandler = () => {
        axios
            .delete(`/form/suggestion/${id}/${memberId}`)
            .then(res => {
                alert('견적이 삭제되었습니다.');
                window.location.reload();
            })
            .catch(error => {
                alert('견적 삭제 중 에러가 발생하였습니다.');
                console.log('견적 삭제 error : ' + error);
            });
    };
    return (
        <>
            <div className='sub-division'></div>
            <div className='suggestion-block'>
                <div className='suggestion-block__inner'>
                    <h2 className='left-align'>견적서 작성하기</h2>
                    <form onSubmit={submitHandler}>
                        <h5 className='suggestion-block__h5'>예상 견적가</h5>
                        <InputBox type='text' name='s_money' placeholder='원' value={formData.s_money} onChange={changeHandler}></InputBox>
                        <h5>상세 설명</h5>
                        <textarea className='apply-form-desc' type='textarea' name='s_desc' value={formData.s_desc} onChange={changeHandler} placeholder='ex) 함께 일하기 어렵습니다.'></textarea>
                        {/* <InputBox
                            type='text'
                            name='s_desc'
                            value={formData.s_desc}
                            onChange={changeHandler}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                }
                            }}
                        ></InputBox> */}
                        <div className='suggestion-block__btn-outer'>
                            {isNew ? null : (
                                <div className='btn-dynamic suggestion-block__btn' onClick={onDeleteHandler}>
                                    삭제하기
                                </div>
                            )}
                            <button className='btn-dynamic suggestion-block__btn'>{isNew ? '등록하기' : '수정하기'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
