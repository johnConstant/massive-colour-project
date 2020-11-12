import React, { Component } from 'react';
import { generatePalette } from './colourHelper';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColourPalette from './SingleColourPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

import seedColours from './SeedColours';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
		this.state = {
			palette: savedPalettes || seedColours
		};
		this.savePalette = this.savePalette.bind(this);
		this.findPalette = this.findPalette.bind(this);
		this.deletePalette = this.deletePalette.bind(this);
	}
	findPalette(id) {
		return this.state.palette.find((palette) => {
			return palette.id === id;
		});
	}
	savePalette(newPalette) {
		this.setState(
			{
				palette: [ ...this.state.palette, newPalette ]
			},
			this.syncLocalStorage
		);
	}
	deletePalette(id) {
		this.setState(
			(currentState) => ({
				palette: currentState.palette.filter((palette) => palette.id !== id)
			}),
			this.syncLocalStorage
		);
	}
	syncLocalStorage() {
		window.localStorage.setItem('palettes', JSON.stringify(this.state.palette));
	}
	render() {
		//console.log(generatePalette(seedColours[4]));
		return (
			<Route
				render={({ location }) => (
					<TransitionGroup>
						<CSSTransition key={location.key} classNames="item" timeout={300}>
							<Switch location={location}>
								<Route
									exact
									path="/palette/new"
									render={(routeProps) => (
										<Page>
											<NewPaletteForm
												savePalette={this.savePalette}
												palettes={this.state.palette}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/"
									render={(routeProps) => (
										<Page>
											<PaletteList
												palettes={this.state.palette}
												deletePalette={this.deletePalette}
												{...routeProps}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:id"
									render={(routeProps) => (
										<Page>
											<Palette
												palette={generatePalette(this.findPalette(routeProps.match.params.id))}
											/>
										</Page>
									)}
								/>
								<Route
									exact
									path="/palette/:paletteId/:colourId"
									render={(routeProps) => (
										<Page>
											<SingleColourPalette
												colourId={routeProps.match.params.colourId}
												palette={generatePalette(
													this.findPalette(routeProps.match.params.paletteId)
												)}
											/>
										</Page>
									)}
								/>
								<Route
									render={(routeProps) => (
										<Page>
											<PaletteList
												palettes={this.state.palette}
												deletePalette={this.deletePalette}
												{...routeProps}
											/>
										</Page>
									)}
								/>
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				)}
			/>

			// <div>
			// 	<Palette palette={generatePalette(seedColours[2])} />
			// </div>
		);
	}
}

export default App;
