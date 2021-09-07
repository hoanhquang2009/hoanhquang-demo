
import { Component } from 'react';
import Tasklist from './tasklist';
class Taskitem extends Component {
    onupdatestatus=()=>{
        this.props.onupdatestatus(this.props.task.id)
    }
    delete=()=>{
        this.props.delete(this.props.task.id);
    }
    update=()=>{
        this.props.update(this.props.task.id);
    }
  render() {
    var {task,index}=this.props;
    return ( 
        <tr>
        <td>{index+1}</td>
        <td>{task.name}</td>
        <td className="text-center">
            <span className={task.status===true?'label label-success':'label label-danger'} onClick={this.onupdatestatus}>
                        {task.status===true?'kích hoạt':'Ẩn'}
                    </span>
        </td>
        <td className="text-center">
            <button type="button" className="btn btn-warning" onClick={this.update}>
                <span className="fa fa-pencil mr-5"></span>Sửa
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger" onClick={this.delete}>
                <span className="fa fa-trash mr-5"></span>Xóa
            </button>
        </td>
    </tr>

    )
  }
}

export default Taskitem;
