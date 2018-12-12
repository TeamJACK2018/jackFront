import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getMyTask, editMyTask, deleteMyTask } from '../API';
import { Redirect } from 'react-router-dom'

class EditMyTaskCard extends Component {
  constructor(props){
    super(props)
    this.state={
      editSuccess: false,
      deleteSuccess: false,
      form: {
        mytask: {
          id: '',
          task_id: '',
          user_id: '',
          due_date: '',
          completed: '',
          frequency: '',
          notes: ''
        },
        task: {
          id: '',
          title: '',
          description: '',
          category: '',
          sub_category: ''
        }
      }
    }
  }
  render() {
    console.log(this.props);
    console.log(this.state.form.mytask)
    let {task_id, user_id, due_date, completed, frequency, notes} = this.state.form.mytask
    return (
      <div className="tile">
      <td>
        <label>
          Notes:
        </label>
        <br/>
        <input type="text" value={notes} name="notes" onChange={this.handleChange} />
      </td>
      <br/>
        <td>
          <label>
            Due Date:
          </label>
          <br/>
          <input type="date" value={due_date} name="due_date" onChange={this.handleChange} />
        </td>
        <br/>
        <td>
          <label>
            How often (days)?:
          </label>
          <br/>
          <input type="number" name="frequency" value={frequency} onChange={this.handleChange} pattern="[0-9]"/>
        </td>
        <br/>
        <div className="tileLinks">
          <Button className="btn btn-success" onClick={this.handleEdit}><i class="far fa-thumbs-up"></i></Button>
          <Button className="btn btn-danger" onClick={() => this.handleDelete(this.state.form.mytask.id)}><i class="far fa-trash-alt"></i></Button>
        </div>
        {this.state.editSuccess && <Redirect to="/"/>}
        {this.state.deleteSuccess && <Redirect to="/"/>}
      </div>
    );
  }

  componentDidMount(){
    getMyTask(this.props.match.params.id)
    .then(APImyTask => {
      console.log(APImyTask)
      this.setState({
        form: APImyTask
      })
    })
  }

  handleChange = (e) => {
    let {form} = this.state
    console.log(form.mytask)
    console.log(e.target.name)
    console.log(e.target.value)
    form.mytask[e.target.name] = e.target.value
    this.setState({form})
  }

  handleEdit = (e) => {
    e.preventDefault()
    console.log(this.state.form.mytask)
    editMyTask(this.state.form.mytask)
    .then(resp => {
      this.setState({editSuccess: true})
    })
    this.props.refresh()
  }

  handleDelete = (id) => {
    console.log(id);
    deleteMyTask(id)
    .then(resp => {
      this.setState({deleteSuccess: true})
      console.log("DELETED");
    })
  }
}

export default EditMyTaskCard;