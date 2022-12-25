import React, { Component } from "react"
import ReactDOM from "react-dom/client"
import './styles/styles.scss'
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lines: []
		};
		this.LineDelete = this.LineDelete.bind(this);
		this.LineAdd = this.LineAdd.bind(this);
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem("lines");
			const lines = JSON.parse(json);
			if (lines) {
				this.setState(() => ({lines: lines}));
			} 
		} catch(e) {
			console.log(e)
			console.log("Saves not found")
		}
	}

	componentDidUpdate(prevProps, prevState) {
        if (prevState.lines.length !== this.state.lines.length) {
            const json = JSON.stringify(this.state.lines);
            localStorage.setItem("lines", json);
        }
    }

	LineDelete(lineToDelete) {
		this.setState((prevState) => ({ lines: prevState.lines.filter((line) => line !== lineToDelete) }))
	}

	LineAdd(lineToAdd) {
		if (lineToAdd) {
			if (this.state.lines.indexOf(lineToAdd) == -1) {
				this.setState((prevState) => ({ lines: prevState.lines.concat(lineToAdd) }))
			} else { 
				console.log("Повторка")
			}
		} else {
			console.log("пустая строка")
		}
	}

	render () {
		return (
			<div className="container">
				<Header />
				<Lines lines={this.state.lines} LineDelete={this.LineDelete} />
				<Edit LineAdd={this.LineAdd}/>
			</div>
		);
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Header = () => (
	<h1 className="header">This is my first React project {}</h1>
)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Line = (props) => (

	<div className="line">
		<div className="line__text">{props.text}</div>
		<button className="line__delete" onClick={(e) => { props.LineDelete(props.text)}}>Delete</button>
	</div>	
)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const Lines = (props) => (

	<div>{props.lines.map((line) => (<Line key={line} text={line} LineDelete={props.LineDelete} />))}</div>
)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Edit extends React.Component {
	constructor(props) {
		super(props);
		this.LineAdd = this.LineAdd.bind(this);
	}

	LineAdd(e) {
		e.preventDefault();
		const val = e.target.elements.add_inp.value;
		this.props.LineAdd(val);
		e.target.elements.add_inp.value = ''
	}

	render() {
		return (
			<>
				<form onSubmit={this.LineAdd}>
					<input className="input_add" name="add_inp" placeholder="Type your item ..." />
				</form>
			</>
		)
	}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<App />)
