import { Component } from 'react';

class Toggle extends Component {
	state = {
		on: false,
	};

	toggle = event => {
		console.log(`toggle`);
		event.stopPropagation();
		this.setState(prevState => ({ on: !prevState.on }));
	};

	render() {
		return (
			<div>
				{this.props.render({
					on: this.state.on,
					toggle: this.toggle,
				})}
			</div>
		);
	}
}

export default Toggle;
