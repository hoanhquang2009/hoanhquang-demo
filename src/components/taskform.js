
import { Component } from 'react';

class TaskForm extends Component {
  constructor(props){
    super(props);
    this.state={
          id:'',
          name:'',
          status:true
    }
  }
  componentWillMount(){
      if(this.props.task){
        this.setState({
            id:this.props.task.id,
            name:this.props.task.name,
            satus:this.props.task.status
        })
      }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
          id:nextProps.task.id,
          name:nextProps.task.name,
          status:nextProps.task.status
      })
    }else if(!nextProps.task){
        this.setState({
          id:'',
          name:'',
          status:true
        });
    }
  }
  oncloseform=()=>{
      this.props.oncloseform();
  }
  onChange=(event)=>{
     var  target= event.target;
     var name= target.name;
     var value=target.value;
     if(name==='status'){
       value=target.value==='true'?true:false;
     }
     this.setState({
          [name]:value
     });
     
  }
  onSubmit=(event)=>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onclear();
    this.oncloseform();
  }
  onclear=()=>{
        this.setState({
          name:'',
          status:false
        })
  }
  render() {
    var {id}=this.state;
    return (
        <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">{id !=='' ? 'Cập nhật công Việc': 'Thêm Công Việc' }<i class='bx bx-x r-0' onClick={this.oncloseform}></i></h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label >Tên :</label>
              <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}/>
              <label >Trạng Thái :</label>
              <select name="status" id="input" className="form-control" required="required" value={this.state.satus} onChange={this.onChange}>
                <option value={true}> Kích Hoạt</option>
                <option value={false}> Ẩn</option>
              </select>

            </div>
            <div className="text-center">

              <button type="submit" className="btn btn-warning"><i className='bx bx-plus-medical' ></i>Lưu Lại</button>

              <button type="button" className="btn btn-danger"  onClick={this.onclear}><i className='bx bx-x'></i>Hủy Bỏ</button>


            </div>
          </form>
        </div>
      </div>

    )
  }
}

export default TaskForm;
