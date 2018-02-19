class Validate {
  /*
   * default parameters
   * value = field value
  */
  required(value) {
    let val = value;
    if (typeof value === 'string') {
      val = val.trim();
    }

    const success = (val && val.length);

    return {
      valid: success,
      message: (!success) ? 'Este campo é obrigatório' : '',
    };
  }
}

export default new Validate();
