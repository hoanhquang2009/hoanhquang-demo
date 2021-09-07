
import './App.css';
import { Component } from 'react';
import TaskForm from './components/taskform';
import Control from './components/control';
import Tasklist from './components/tasklist';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayform: false,
      taskeditting: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortby: 'name',
      sortvalue: 1
    }
  }
  componentWillMount() {
    if (localStorage && localStorage.getItem('task')) {
      var tasks = JSON.parse(localStorage.getItem('task'));
      this.setState({
        tasks: tasks
      })
    }
  }
  onGenerateData = () => {
    var tasks = [
      {
        id: this.GenerateID(),
        name: ' Học Lập Trình',
        status: true
      },
      {
        id: this.GenerateID(),
        name: ' PHP',
        status: true
      },
      {
        id: this.GenerateID(),
        name: ' JavaScript',
        status: false
      },
      {
        id: this.GenerateID(),
        name: ' ES6',
        status: false
      }
    ];
    this.setState(
      {
        tasks: tasks
      }
    );
    // lưu trữ trong localStorage của trình duyệt
    localStorage.setItem('task', JSON.stringify(tasks));

  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  GenerateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }
  onToggeform = () => {
    if (this.state.isDisplayform && this.state.taskeditting !== null) {
      this.setState({
        isDisplayform: true,
        taskeditting: null
      });
    }
    else {
      this.setState({
        isDisplayform: !this.state.isDisplayform,
        taskeditting: null
      });
    }
  }
  oncloseform = () => {
    this.setState({
      isDisplayform: false
    })
  }
  onshowform = () => {
    this.setState({
      isDisplayform: true
    })
  }
  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === '') {
      data.id = this.GenerateID();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskeditting: null
    });
    localStorage.setItem('task', JSON.stringify(tasks));

  }
  onupdatestatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('task', JSON.stringify(tasks));
    };
  }
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    }
    );
    return result;
  }
  delete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('task', JSON.stringify(tasks));
    };
    this.oncloseform();
  }
  update = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskeditting = tasks[index];
    this.setState({
      taskeditting: taskeditting
    });
    this.onshowform();

  }
  onFilter = (filterName, filterstatus) => {
    filterstatus = parseInt(filterstatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterstatus
      }
    })
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword.toLowerCase()
    })
  }
  onSort = (sortby, sortvalue) => {
    this.setState({
      sortby: sortby,
      sortvalue: sortvalue
    });

  }
  render() {
    var { tasks, isDisplayform, taskeditting, filter, keyword, sortby, sortvalue } = this.state; // var tasks=this.state.tasks;
    // fillter hiển thị danh sách
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((tasks) => {
        if (filter.status === -1) {
          return tasks;
        } else {
          return tasks.status === (filter.status === 1 ? true : false)
        }
      })
    }
    // keyword của search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }
    // sắp xếp danh sách theo tên và trạng thái
    if(sortby==='name'){
      tasks.sort((a,b)=>{
          if(a.name>b.name) return sortvalue;
          else if(a.name<b.name) return -sortvalue;
          else return 0;
      });
    }else{
      tasks.sort((a,b)=>{
        if(a.status>b.status) return -sortvalue;
        else if(a.status<b.status) return sortvalue;
        else return 0;
    });
    }
    //tạo ra task form
    var elmTaskform = isDisplayform ? <TaskForm oncloseform={this.oncloseform} onSubmit={this.onSubmit} task={taskeditting} /> : '';
    return (

      <div className="container">
        <div className="text-center">
          <h1> QUẢN LÝ CÔNG VIỆC</h1>
          <hr />
        </div>

        <div className="row">
          <div className={isDisplayform ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elmTaskform}
          </div>

          <div className={isDisplayform ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>

            <button
              type="button"
              className="btn btn-info"
              onClick={this.onToggeform}
            ><i class='bx bx-plus-medical' ></i>Thêm Công Việc</button>
            <button
              type="button"
              className="btn btn-danger ml-10"
              onClick={this.onGenerateData}

            >Tạo Ra Data</button>
            {/* search va sort */}
            <Control onSearch={this.onSearch} onSort={this.onSort} sortby={sortby} sortvalue={sortvalue} />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Tasklist tasks={tasks} onupdatestatus={this.onupdatestatus} delete={this.delete} update={this.update}
                  onFilter={this.onFilter} />
              </div>
            </div>


          </div>

        </div>

      </div>

    )
  }
}

export default App;
