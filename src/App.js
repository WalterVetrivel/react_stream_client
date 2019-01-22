import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import StreamList from './components/StreamList/StreamList';
import StreamCreate from './components/StreamCreate/StreamCreate';
import StreamEdit from './components/StreamEdit/StreamEdit';
import StreamDelete from './components/StreamDelete/StreamDelete';
import StreamShow from './components/StreamShow/StreamShow';
import {fetchStreams} from './store/actions/';
import {connect} from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import history from './history';
import './App.scss';

class App extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	render() {
		return (
			<Router history={history}>
				<div className="App">
					<Navbar />
					<Switch>
						<Route path="/streams/new" component={StreamCreate} />
						<Route path="/streams/edit/:id" component={StreamEdit} />
						<Route path="/streams/delete/:id" component={StreamDelete} />
						<Route path="/streams/show/:id" component={StreamShow} />
						<Route path="/" component={StreamList} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default connect(
	null,
	{fetchStreams}
)(App);
