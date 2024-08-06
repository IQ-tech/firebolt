
import classNames from 'classnames';

const InputCheckbox = ({
  disabled = false,
  label,
  onChange,
  value,
  checked,
  id,
  name
}) => {
  const inputClassName = classNames('ac-checkbox-field', {
    'ac-checkbox-field--disabled': !!disabled,
  });

  return (
    <div className={inputClassName}>
      <div className="ac-checkbox-field__fieldset">
        <input
          name={name}
          checked={checked}
          className="ac-checkbox-field__input"
          id={id}
          onChange={onChange}
          type="checkbox"
          value={value}
        />
        <label
          htmlFor={id}
          className="ac-checkbox-field__label"
          dangerouslySetInnerHTML={label ? { __html: label } : undefined}
        />
      </div>
    </div>
  );
};

export default InputCheckbox;
