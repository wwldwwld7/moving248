import './Checkbox.css';

const Checkbox = ({ name, checked, onChange, onClick }) => {
    return (
        <div className='checkbox' onClick={onClick}>
            <input name={name} type='checkbox' className='checkbox-input' checked={checked} onChange={onChange} />
            <div className='checkbox-custom'>{checked && <span className='checkmark'>&#x2713;</span>}</div>
        </div>
    );
};
export default Checkbox;
