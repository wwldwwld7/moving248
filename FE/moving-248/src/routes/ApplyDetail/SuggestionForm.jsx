import InputBox from '../../components/UI/InputBox';

export default function SuggestionForm({ mySuggestion }) {
    const submitHandler = e => {
        e.preventDefault();

        // Validation check
        // if (isValid.username && isValid.email && isValid.telephone && isValid.password && isValid.checkPass) {
        //     console.log('Form submitted successfully!');
        // }

        // 넣어라 api call login here
    };
    return (
        <>
            <div className='sub-division'></div>
            <div className='suggestion-block'>
                <div className='suggestion-block__inner'>
                    <h2 className='left-align'>견적서 작성하기</h2>
                    <form onSubmit={submitHandler}>
                        <h5 className='suggestion-block__h5'>예상 견적가</h5>
                        <InputBox></InputBox>
                        <h5>상세 설명</h5>
                        <InputBox></InputBox>
                        <div className='suggestion-block__btn-outer'>
                            <button className='btn-dynamic suggestion-block__btn'>확정하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
