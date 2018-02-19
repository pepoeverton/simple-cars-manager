import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

const Button = (props) => {
  const {
    onClick,
    label,
    className,
    disabled,
    type,
    loading,
  } = props;

  return (
    <button disabled={disabled} className={`btn pure-button ${className}`} type={type} onClick={onClick}>
      {(loading) ? (
        <span className="btn-text">Carregando...</span>
      ) : (
        <span className="btn-text">{label}</span>
      )}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  loading: false,
};

export default Button;
