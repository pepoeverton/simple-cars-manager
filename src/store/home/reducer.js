import {
  LOADING_CARS,
  RECEIVE_CARS,
  DELETE_CARS,
  CREATE_CAR,
  EDIT_CAR,
  FILTER_CAR,
  TOGGLE_ALL_CARS,
  TOGGLE_CAR,
} from './actions';

function removeCar(stateCars, deleteCars) {
  return stateCars.filter(car => !deleteCars.includes(car));
}

function updateCar(stateCars, upCar) {
  return stateCars.map((car) => {
    if (car.id === upCar.id) {
      return upCar;
    }
    return car;
  });
}

function toggleAllCars(stateCars, isChecked) {
  return stateCars.map((car) => {
    return {
      ...car,
      checked: isChecked,
    };
  });
}

function toggleCar(stateCars, upCar) {
  return stateCars.map((car) => {
    if (car.id === upCar.id) {
      return {
        ...car,
        checked: !car.checked,
      };
    }
    return car;
  });
}

export default function home(state = {
  isFetching: false,
  success: false,
  search: '',
  cars: [],
}, action) {
  switch (action.type) {
    case LOADING_CARS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_CARS:
      return {
        ...state,
        isFetching: false,
        cars: action.cars,
      };
    case DELETE_CARS:
      return {
        ...state,
        isFetching: false,
        cars: removeCar(state.cars, action.deleteCars),
      };
    case CREATE_CAR:
      return {
        ...state,
        isFetching: false,
        success: true,
        cars: [...state.cars, action.newCar],
      };
    case EDIT_CAR:
      return {
        ...state,
        isFetching: false,
        success: true,
        cars: updateCar(state.cars, action.car),
      };
    case FILTER_CAR:
      return {
        ...state,
        search: action.search,
      };
    case TOGGLE_ALL_CARS:
      return {
        ...state,
        cars: toggleAllCars(state.cars, action.isChecked),
      };
    case TOGGLE_CAR:
      return {
        ...state,
        cars: toggleCar(state.cars, action.car),
      };
    default:
      return state;
  }
}

export function receiveCarsBySearch(listCars, searchParams) {
  const search = searchParams.toLocaleLowerCase().trim();
  let newListCars = listCars.slice(0);

  if (!search.length) return newListCars;

  newListCars = newListCars.filter((car) => {
    const modelo = car.modelo.toLocaleLowerCase().trim();
    const marca = car.marca.toLocaleLowerCase().trim();

    return modelo.includes(search) || marca.includes(search);
  });

  return newListCars;
}
