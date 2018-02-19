import { receiveApiError } from '../actions';
import Car from '../../services/Car';

export const LOADING_CARS = 'LOADING_CARS';
export const RECEIVE_CARS = 'RECEIVE_CARS';
export const DELETE_CARS = 'DELETE_CARS';
export const CREATE_CAR = 'CREATE_CAR';
export const EDIT_CAR = 'EDIT_CAR';
export const FILTER_CAR = 'FILTER_CAR';
export const TOGGLE_CAR = 'TOGGLE_CAR';
export const TOGGLE_ALL_CARS = 'TOGGLE_ALL_CARS';

export function loadingCars() {
  return {
    type: LOADING_CARS,
  };
}

export function receiveCars() {
  return (dispatch) => {
    dispatch(loadingCars());
    Car.get()
      .then((resp) => {
        let cars = resp.data;
        if (cars.length) {
          cars = resp.data.map((car) => {
            return {
              ...car,
              checked: false,
            };
          });
        }
        dispatch({ type: RECEIVE_CARS, cars });
      })
      .catch(() => {
        dispatch(receiveApiError('Erro ao receber os carros'));
      });
  };
}

export function deleteCars() {
  return (dispatch, getState) => {
    let delCars = getState().home.cars;
    if (delCars.length) {
      delCars = getState().home.cars.filter((car) => {
        return car.checked;
      });

      Promise.all(delCars.map((resp) => { return Car.delete(resp.id); }))
        .then(() => {
          dispatch({ type: DELETE_CARS, deleteCars: delCars });
        })
        .catch(() => {
          dispatch(receiveApiError('Erro ao deletar os carros selecionados'));
        });
    }
  };
}

export function createCar(newCar) {
  return (dispatch) => {
    Car.create(newCar)
      .then((resp) => {
        dispatch({ type: CREATE_CAR, newCar: { id: resp.data.id, ...newCar } });
      })
      .catch(() => {
        dispatch(receiveApiError('Erro ao criar uma carro'));
      });
  };
}

export function editCar(car) {
  return (dispatch) => {
    Car.update(car)
      .then(() => {
        dispatch({ type: EDIT_CAR, car });
      })
      .catch(() => {
        dispatch(receiveApiError('Erro ao editar um carro'));
      });
  };
}

export function filterCars(search) {
  return (dispatch) => {
    dispatch({ type: FILTER_CAR, search });
  };
}

export function toggleAllCars(isChecked) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_ALL_CARS, isChecked });
  };
}

export function toggleCar(car) {
  return (dispatch) => {
    dispatch({ type: TOGGLE_CAR, car });
  };
}
