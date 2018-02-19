import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import './style.less';

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.renderData = this.renderData.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.isCheckedAll = this.isCheckedAll.bind(this);
  }

  isCheckedAll() {
    if (!this.props.data.length) return false;
    return this.props.data.every(item => item.checked);
  }

  renderHeader(item, i) {
    return (
      <th key={i}>{item.name}</th>
    );
  }

  renderData(item, i) {
    return (
      <tr
        key={i}
        onDoubleClick={() => { this.props.openEditItem(item); }}>
        <td>
          <input
            type="checkbox"
            onChange={() => this.props.selectItem(item)}
            checked={item.checked}
          />
        </td>
        <td>{item.placa}</td>
        <td>{item.modelo}</td>
        <td>{item.marca}</td>
        <td>
          {(item.imagem) ? (
          <a href={item.imagem} target="_blank" >Imagem</a>
          ) : (
          <span>Sem foto</span>
          )}
        </td>
        <td>{item.combustivel}</td>
        <td>
          <NumberFormat value={item.valor} displayType={'text'} thousandSeparator={true} prefix={'R$ '} />
        </td>
      </tr>
    );
  }

  render() {
    const {
      data,
      columns,
      selectAll,
      messageEmpty,
    } = this.props;

    return (
      <table className="table-default pure-table pure-table-horizontal">
        <thead>
          <tr>
            <th>
              <input
              type="checkbox"
              onChange={(e) => { selectAll(e.target.checked); } }
              checked={this.isCheckedAll()}
              />
            </th>
            {columns.map(this.renderHeader)}
          </tr>
        </thead>
        <tbody>
          {(data.length) ? (
            data.map(this.renderData)
          ) : (
            <tr className="table-empty" >
              <td colSpan="7" >
                {messageEmpty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  selectItem: PropTypes.func,
  selectAll: PropTypes.func,
  openEditItem: PropTypes.func,
  data: PropTypes.array,
  columns: PropTypes.array,
  messageEmpty: PropTypes.string,
  defaultPageSize: PropTypes.number,
  loading: PropTypes.bool,
};

Table.defaultProps = {
  list: [],
  loading: false,
  messageEmpty: 'Nenhum dado encontrado',
};

export default Table;
