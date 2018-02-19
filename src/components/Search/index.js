import React from 'react';
import PropTypes from 'prop-types';
import IconSearch from '../Icons/IconSearch';
import './style.less';

const Search = (props) => {
  const {
    onChange,
    placeholder,
    className,
    type,
    disabled,
  } = props;
  return (
    <div className="input-group">
      <input
        className={`input-default ${className}`}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        disabled={disabled} />
      <div className="input-group-icon">
        <IconSearch />
      </div>
    </div>
  );
};

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

Search.defaultProps = {
  type: 'text',
  disabled: false,
  loading: false,
  className: '',
};

export default Search;
