
import { Component } from 'react';
import Sort from './sort';
import Search from './search';

class Control extends Component {
  render() {
    return (
        <div className="row mt-15">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <Search onSearch={this.props.onSearch}/>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <Sort onSort={this.props.onSort} sortby={this.props.sortby} sortvalue={this.props.sortvalue}/>
              </div>
            </div>
    )
  }
}


export default Control;
