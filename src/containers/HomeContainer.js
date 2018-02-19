import { connect } from 'react-redux';
import {
  receiveCars,
  deleteCars,
  createCar,
  editCar,
  filterCars,
  toggleAllCars,
  toggleCar,
} from '../store/home/actions';
import { receiveCarsBySearch } from '../store/home/reducer';

import Home from '../screens/Home';

function mapStateToProps(state) {
  return {
    isFetching: state.home.isFetching,
    success: state.home.success,
    cars: receiveCarsBySearch(state.home.cars, state.home.search),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    receiveCars: () => {
      dispatch(receiveCars());
    },
    deleteCars: () => {
      dispatch(deleteCars());
    },
    createCar: (car) => {
      dispatch(createCar(car));
    },
    editCar: (car) => {
      dispatch(editCar(car));
    },
    filterCars: (search) => {
      dispatch(filterCars(search));
    },
    toggleAllCars: (isChecked) => {
      dispatch(toggleAllCars(isChecked));
    },
    toggleCar: (car) => {
      dispatch(toggleCar(car));
    },
  };
}

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default HomeContainer;
