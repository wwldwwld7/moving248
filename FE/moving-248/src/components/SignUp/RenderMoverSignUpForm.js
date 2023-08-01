import React, { useState } from 'react';

import Card from '../UI/Card';
import InputBox from '../UI/InputBox';

const RenderMoverSignUpForm = props => {
    return (
        <Card>
            <div className='form'>
                <form>
                    <InputBox label='이름' type='text' name='username' placeholder='이름을 입력해주세요' required></InputBox>
                    <InputBox label='휴대폰번호' type='text' name='telephone' placeholder='010-0000-0000' required></InputBox>
                </form>
            </div>
        </Card>
    );
};

export default RenderMoverSignUpForm;
