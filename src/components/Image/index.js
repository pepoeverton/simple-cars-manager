import React from 'react';
import PropTypes from 'prop-types';
import IconPhoto from '../Icons/IconPhoto';
import './style.less';

const Image = (props) => {
  const isEmpty = (!props.imagem) ? 'is-empty' : '';
  return (
    <div className={`container-picture ${isEmpty}`}>
      <span className="container-title">
        <span className="title">{props.text}</span>
      </span>
      {(props.imagem) ? (
        <img src={props.imagem} width="100%" height="100%" /> // eslint-disable-line
      ) : (
        <IconPhoto />
      )}
      <input
        type="file"
        name="file"
        size={2000}
        onChange={props.onChange}
        accept="image/jpeg, image/jpg, image/png"/>
    </div>
  );
};

Image.propTypes = {
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  imagem: PropTypes.string,
};


export default Image;
