import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import FormCar from './Form';
import './style.less';

Modal.setAppElement('#app');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
  },
};

class ModalCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      show,
      close,
      data,
      createCar,
      editCar,
    } = this.props;
    return (
      <Modal
        isOpen={show}
        closeTimeoutMS={2}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        shouldReturnFocusAfterClose={true}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName="modal-default__overlay"
      >
      <FormCar
        close={close}
        create={createCar}
        edit={editCar}
        data={data}
      />
      </Modal>
    );
  }
}

ModalCar.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
  createCar: PropTypes.func,
  editCar: PropTypes.func,
  className: PropTypes.string,
  data: PropTypes.object,
};

export default ModalCar;
