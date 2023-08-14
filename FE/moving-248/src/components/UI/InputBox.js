import classes from './InputBox.module.css';

const InputBox = props => {
    const { label, type, name, placeholder, required, value, onChange, readOnly } = props;

    const hasError = props.children && props.children.props.className.includes('error');

    const isValid = !hasError; // Determine validity based on error status

    // const handleKeyPress = e => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //     }
    // };

    return (
        <div className={`${classes.input_box}`}>
            <label>{label}</label>
            <input
                className={`${classes.input_field} ${!isValid ? classes.invalid : ''}`}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                // onKeyDown={handleKeyPress}
            />
            {/* Optionally, you can display the error message here for better placement */}
            {props.children}
        </div>
    );
};

export default InputBox;
