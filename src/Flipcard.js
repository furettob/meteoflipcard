import React, {Component} from 'react';


class Flipcard extends Component {

	INITIAL_STATE = {
		flipped: false
	}

	constructor(props) {
		super(props)
		this.state = {...this.INITIAL_STATE}
	}

	flip = () => {
		this.setState({flipped: !this.state.flipped})
	}


	render = () => {
		const backFlipped = this.state.flipped ? "card--back--flip" : ""
		const frontFlipped = this.state.flipped ? "card--front--flip" : ""
		return <div className="fb-flipcard" onClick={this.flip}>

			<div className="note">Click anywhere to flip</div>

			<div className="card-wrapper">
				<div className={"card"}>
					<div className={"card--side card--front " + frontFlipped}>
					  <div className="side--content">
					  	{this.props.children[0]}
					  </div>
					</div>

					<div className={"card--side card--back " + backFlipped}>
					  <div className="side--content">
					  	{this.props.children[1]}
					  </div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default Flipcard;
