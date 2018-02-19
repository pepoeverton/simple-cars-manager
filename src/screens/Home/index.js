import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Search from '../../components/Search';
import Table from '../../components/Table';
import ModalCar from '../../components/ModalCar';
import './style.less';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedCar: {},
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openEditCar = this.openEditCar.bind(this);
    this.searchCar = this.searchCar.bind(this);
    this.getColumns = this.getColumns.bind(this);
    this.isDisabledBtn = this.isDisabledBtn.bind(this);
  }

  componentDidMount() {
    this.props.receiveCars();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ showModal: false });
    }
  }

  getColumns() {
    return [
      {
        name: 'Placa',
        nameProps: 'placa',
      },
      {
        name: 'Modelo',
        nameProps: 'modelo',
      },
      {
        name: 'Marca',
        nameProps: 'marca',
      },
      {
        name: 'Foto',
        nameProps: 'imagem',
      },
      {
        name: 'Combustível',
        nameProps: 'combustivel',
      },
      {
        name: 'Valor',
        nameProps: 'valor',
      },
    ];
  }

  searchCar(e) {
    this.props.filterCars(e.target.value);
  }

  openEditCar(selectedCar) {
    this.setState({ showModal: true, selectedCar });
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false, selectedCar: {} });
  }

  isDisabledBtn() {
    return !this.props.cars.some(car => car.checked);
  }

  render() {
    const {
      cars,
      deleteCars,
      createCar,
      editCar,
      toggleAllCars,
      toggleCar,
    } = this.props;
    const { selectedCar, showModal } = this.state;
    const columns = this.getColumns();

    return (
      <div>
        <Header />
        <div className="container">
          <div className="container-actions pure-g">
            <div className="container-btn pure-u-1-2 pure-u-md-1-3">
              <Button
                className="btn-green"
                label="Novo Carro"
                onClick={this.openModal}
                />
              <Button
                className="btn-red"
                label="Excluir Carro"
                onClick={deleteCars}
                disabled={this.isDisabledBtn()}
                />
            </div>
            <div className="container-search pure-u-1-2 pure-u-md-1-3">
              <Search
                onChange={this.searchCar}
                placeholder="Pesquisar"
              />
            </div>
          </div>
          <div className="">
            <Table
              data={cars}
              columns={columns}
              messageEmpty="Nenhum carro encontrado"
              selectAll={toggleAllCars}
              selectItem={toggleCar}
              openEditItem={this.openEditCar}
            />
          </div>
        </div>
        <ModalCar
          show={showModal}
          createCar={createCar}
          editCar={editCar}
          close={this.closeModal}
          data={selectedCar}
        />
      </div>
    );
  }
}

Home.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  cars: PropTypes.array.isRequired,
  receiveCars: PropTypes.func.isRequired,
  deleteCars: PropTypes.func.isRequired,
  createCar: PropTypes.func.isRequired,
  editCar: PropTypes.func.isRequired,
  filterCars: PropTypes.func.isRequired,
  toggleAllCars: PropTypes.func.isRequired,
  toggleCar: PropTypes.func.isRequired,
};

export default Home;
