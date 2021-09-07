
import { Component } from 'react';
import Taskitem from './taskitem';
class Tasklist extends Component {
    constructor(props){
        super(props);
        this.state={
            filterName:'',
            filterstatus:-1// all:-1, active:1 , unactive:0
        }
    }
    onChange=(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.props.onFilter(
            name==='filterName'?value:this.state.filterName,
            name==='filterstatus'?value:this.state.filterstatus

        )
        this.setState({
            [name]:value
        });

    }
  render() {
      var {tasks}=this.props;
      var{filterName,filterstatus}=this.state;
      var Elementtask=tasks.map((task,index)=>{
          return <Taskitem key={task.id} index={index} task={task} onupdatestatus={this.props.onupdatestatus}
                    delete={this.props.delete} update={this.props.update}
          />
      });
    return (
        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">STT</th>
                                    <th className="text-center">Tên</th>
                                    <th className="text-center">Trạng Thái</th>
                                    <th className="text-center">Hành Động</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>
                                        <input type="text" className="form-control" name="filterName" value={filterName} onChange={this.onChange} />
                                    </td>
                                    <td>
                                        <select className="form-control" name="filterstatus" value={filterstatus} onChange={this.onChange}>
                                            <option value="-1">Tất Cả</option>
                                            <option value="0">Ẩn</option>
                                            <option value="1">Kích Hoạt</option>
                                        </select>
                                    </td>
                                    <td></td>
                                </tr>
                                {Elementtask}
                            </tbody>
                        </table>

    )
  }
}

export default Tasklist;
