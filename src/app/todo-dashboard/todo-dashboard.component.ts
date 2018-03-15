import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { NgRedux } from 'ng2-redux/lib/components/ng-redux';
import { IAppState } from '../store';
import { CLEAR_TODOS } from '../actions';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent implements OnInit {

  @select() todos;
  @select() lastUpdate;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  ngOnInit() {
  }

  clearTodos() {
    this.ngRedux.dispatch({ type: CLEAR_TODOS});
  }

}
