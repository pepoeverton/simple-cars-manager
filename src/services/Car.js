import axios from 'axios';
import config from '../config';

class Car {
  get() {
    return axios.get(`${config.endpoint}/cars`);
  }

  delete(id) {
    return axios.delete(`${config.endpoint}/cars/${id}`);
  }

  create(car) {
    return axios.post(`${config.endpoint}/cars`, car);
  }

  update(car) {
    return axios.put(`${config.endpoint}/cars/${car.id}`, car);
  }
}

export default new Car();
