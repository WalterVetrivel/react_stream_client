import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import StreamList from './components/StreamList/StreamList';
import StreamCreate from './components/StreamCreate/StreamCreate';
import StreamEdit from './components/StreamEdit/StreamEdit';
import StreamDelete from './components/StreamDelete/StreamDelete';
import StreamShow from './components/StreamShow/StreamShow';
import Navbar from './components/Navbar/Navbar';
import './App.scss';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<Switch>
						<Route path="/streams/new" component={StreamCreate} />
						<Route path="/streams/edit" component={StreamEdit} />
						<Route path="/streams/delete" component={StreamDelete} />
						<Route path="/streams/show" component={StreamShow} />
						<Route path="/" component={StreamList} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
