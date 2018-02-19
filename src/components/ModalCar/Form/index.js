import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Validate from '../../../helpers/Validate';
import Image from '../../Image';
import Button from '../../../components/Button';
import './style.less';

const INITIAL_VALIDATION = {
  marca: {
    valid: true,
    message: '',
  },
  modelo: {
    valid: true,
    message: '',
  },
  placa: {
    valid: true,
    message: '',
  },
  combustivel: {
    valid: true,
    message: '',
  },
  valor: {
    valid: true,
    message: '',
  },
  imagem: {
    valid: true,
    message: '',
  },
};

class FormCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        marca: '',
        modelo: '',
        placa: '',
        combustivel: '',
        valor: '',
        imagem: '',
      },
      validation: { ...INITIAL_VALIDATION },
      isEditMode: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.isValidate = this.isValidate.bind(this);
    this.setValidation = this.setValidation.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.data).length) {
      this.setState({
        form: this.props.data,
        isEditMode: true,
      });
    }
  }

  onChangeImage(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          imagem: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  }

  onChange(e) {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  }

  onChangeCurrency(values) {
    const { value } = values;
    this.setState({
      form: {
        ...this.state.form,
        valor: value,
      },
    });
  }

  /*
   * Updates the state with all errors
   * default parameters
   * prop = property to update on object
   * validate = validations to update
   * */
  setValidation(prop, propValid) {
    const { validation } = this.state;
    validation[prop] = {
      valid: propValid.valid,
      message: propValid.message,
    };

    this.setState({ validation });
  }

  isValidate(data) {
    const error = [];

    Object.keys(data).forEach((field) => {
      switch (field) {
        case 'marca': {
          const resp = Validate.required(data[field], 'Marca');
          this.setValidation(field, resp);
          error.push(resp.valid);
          break;
        }
        case 'modelo': {
          const resp = Validate.required(data[field], 'Modelo');
          this.setValidation(field, resp);
          error.push(resp.valid);
          break;
        }
        case 'placa': {
          const resp = Validate.required(data[field], 'Placa');
          this.setValidation(field, resp);
          error.push(resp.valid);
          break;
        }
        default: {
          break;
        }
      }
    });

    return error;
  }

  save(e) {
    e.preventDefault();
    const isValid = this.isValidate(this.state.form);
    if (isValid.every(valid => valid)) {
      if (this.state.isEditMode) {
        this.props.edit(this.state.form);
      } else {
        this.props.create(this.state.form);
      }
    }
  }

  render() {
    const { close } = this.props;
    const { form, isEditMode } = this.state;
    const title = (isEditMode) ? 'Editar carro' : 'Cadastrar novo carro';

    return (
      <div className="container-form">
        <h1>{title}</h1>
        <form
          className="form-default pure-form pure-form-stacked"
          method="POST"
          onSubmit={this.save}>
          <div className="pure-group">
            <div className="pure-u-1-2">
              <Image
                imagem={form.imagem}
                onChange={this.onChangeImage}
                text="Alterar foto do carro"
              />
            </div>
            <div className="pure-u-1-2">
              <label>Marca*</label>
              <input
                className="pure-u-23-24 inpt-default"
                type="text"
                name="marca"
                value={form.marca}
                onChange={this.onChange}
              />
              <span className="pure-form-message">{this.state.validation.marca.message}</span>
              <div className="group-form ">
                <label>Modelo*</label>
                <input
                  className="pure-u-23-24 inpt-default"
                  type="text"
                  name="modelo"
                  value={form.modelo}
                  onChange={this.onChange}
                />
                <span className="pure-form-message">{this.state.validation.modelo.message}</span>
              </div>
            </div>
            <div className="group-form pure-u-1-2">
              <label>Placa*</label>
              <input
                className="pure-u-23-24 inpt-default"
                type="text"
                name="placa"
                value={form.placa}
                onChange={this.onChange}
              />
              <span className="pure-form-message">{this.state.validation.placa.message}</span>
            </div>
            <div className="group-form pure-u-1-2">
              <label>Combustível</label>
              <input
                className="pure-u-23-24 inpt-default"
                type="text"
                name="combustivel"
                value={form.combustivel}
                onChange={this.onChange}
              />
            </div>
            <div className="group-form pure-u-1">
              <label>Valor</label>
              <NumberFormat
                className="pure-u-24-24 inpt-default"
                thousandSeparator={true}
                prefix={'R$ '}
                type="tel"
                name="valor"
                value={form.valor}
                onValueChange={this.onChangeCurrency}
              />
            </div>
          </div>
          <div className="form-group-btn flex-simple-container">
            <Button
              className="btn-default"
              label="Cancelar"
              onClick={close}
            />
            <Button
              className="btn-green"
              label="Salvar"
              type="submit"
              onClick={this.save}
            />
          </div>
        </form>
      </div>
    );
  }
}

FormCar.propTypes = {
  data: PropTypes.object,
  close: PropTypes.func,
  create: PropTypes.func,
  edit: PropTypes.func,
};

export default FormCar;
