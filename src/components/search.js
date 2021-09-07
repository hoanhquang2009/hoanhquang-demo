
import { Component } from 'react';

class Search extends Component {
  constructor(props){
    super(props);
    this.state={
      keyword:''
    }
  }
  onChange=(event)=>{
      var target=event.target;
      var name=target.name;
      var value= target.value;
      this.setState({
          [name]:value
      });
      
      
  }
  onSearch=()=>{
      this.props.onSearch(this.state.keyword);
  }
  render() {
    var {keyword}=this.state;
    return (
        <div className="input-group">
        <input type="text" name="keyword" className="form-control" id="exampleInputAmount" placeholder="Tìm Kiếm ...."
          value={keyword} onChange={this.onChange} />
        <span className="input-group-btn">

          <button type="button" className="btn btn-info" onClick={this.onSearch}><i className='bx bx-search' ></i>Tìm</button>

        </span>
      </div>
    )
  }
}

export default Search;
