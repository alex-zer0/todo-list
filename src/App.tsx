import React from 'react';
import './App.css';
import { Task } from './models/Task';
import TaskItem from './components/task-item/TaskItem';
import TaskInput from './components/task-input/TaskInput';
import { restoreTasks, saveTasks } from './services/local-storage';
import { getUID } from './services/utils';

interface AppState {
  tasks: Task[]
}

class App extends React.Component<{}, AppState> {
  state = {
    tasks: restoreTasks()
  }

  syncToLocalStorage = (tasks: Task[]) => {
    saveTasks(tasks);
    this.setState({ tasks });
  }

  addTask = (title: string) => {
    const { tasks } = this.state;
    this.syncToLocalStorage([ ...tasks, { title, id: getUID(), done: false }]);
  }

  completeTask = (id: number) => {
    const { tasks } = this.state;
    this.syncToLocalStorage(tasks.map(t => t.id === id ? { ...t, done: true } : t));
  }

  deleteTask = (id: number) => {
    const { tasks } = this.state;
    this.syncToLocalStorage(tasks.filter(t => t.id !== id));
  }

  render() {
    const { tasks } = this.state;
    const activeTasks = tasks.filter(task => !task.done);
    const doneTasks = tasks.filter(task => task.done);
    
    return (
      <div className="App">
        <h1 className="top">Active tasks: {activeTasks.length}</h1>
        {[...activeTasks, ...doneTasks].map(task => (
          <TaskItem
            { ...task }
            key={task.id}
            onComplete={this.completeTask}
            onDelete={this.deleteTask}>
          </TaskItem>
        ))}
        <TaskInput onAdd={this.addTask}/>
      </div>
    );
  }
}

export default App;
