
import { Component } from 'react';

class Sort extends Component {
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }
    onClick=(sortby,sortvalue)=>{
        this.props.onSort(sortby,sortvalue);
    }
  render() {
      var icon=<box-icon type='solid' name='down-arrow'></box-icon>;
    return (
        <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                        Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=>this.onClick('name',1)}>
                            <a role="button" className={this.props.sortby==='name'&& this.props.sortvalue===1?icon:''}>
                                        <span className="fa fa-sort-alpha-asc pr-5">
                                            Tên A-Z
                                        </span>
                                    </a>
                        </li>
                        <li onClick={()=>this.onClick('name',-1)}>
                            <a role="button" 
                            className={this.props.sortby==='name'&& this.props.sortvalue===-1?'sort_selecter':''}>
                                        <span className="fa fa-sort-alpha-desc pr-5">
                                            Tên Z-A
                                        </span>
                                    </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick={()=>this.onClick('status',1)}><a
                        className={this.props.sortby==='status'&& this.props.sortvalue===1?'sort_selecter':''}
                        role="button">Trạng Thái Kích Hoạt</a></li>
                        <li onClick={()=>this.onClick('status',-1)}><a
                        className={this.props.sortby==='status'&& this.props.sortvalue===-1?'sort_selecter':''}
                         role="button">Trạng Thái Ẩn</a></li>
                    </ul>
        </div>
    )
  }
}

export default Sort;
