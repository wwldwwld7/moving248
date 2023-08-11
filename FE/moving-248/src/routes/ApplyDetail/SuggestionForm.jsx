import React, { useEffect, useState } from 'react';
import InputBox from '../../components/UI/InputBox';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberActiveApplyAtom, memberEmailAtom, memberIdAtom, memberNameAtom, memberTypeAtom } from '../../atom';

export default function SuggestionForm({ mySuggestion }) {
    const { id } = useParams();

    const memberId = useRecoilValue(memberIdAtom);

    const [formData, setFormData] = useState({
        s_money: '',
        s_desc: '',
    });
    // const [messages, setMessages] = useState({
    //     email: '',
    //     password: '',
    // });

    const changeHandler = e => {
        const { name, value } = e.target;
        // console.log('val : ' + value);
        // console.log(name);

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        // console.log('견적' + formData.s_money);
    };

    const submitHandler = e => {
        e.preventDefault();
        console.log('돈 들어오나?' + formData.s_money);
        console.log('설명' + formData.s_desc);
        const data = {
            p_id: memberId,
            s_money: formData.s_money,
            s_desc: formData.s_desc,
        };

        axios
            .post(`/form/suggestion/${id}`, data)
            .then(res => {
                alert('견적이 등록되었습니다.');
                window.location.href = `/apply-detail/${id}`;
            })
            .catch(error => {
                console.log('견적등록 error : ' + error);
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
                        <InputBox label='예상 가격' type='number' name='s_money' placeholder='원' value={formData.s_money} onChange={changeHandler}></InputBox>
                        <h5>상세 설명</h5>
                        <InputBox label='예상 가격' type='text' name='s_desc' value={formData.s_desc} onChange={changeHandler}></InputBox>
                        <div className='suggestion-block__btn-outer'>
                            <button className='btn-dynamic suggestion-block__btn'>확정하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
