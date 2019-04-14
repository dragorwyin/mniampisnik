import React, { Component } from 'react';

class Loader extends Component {

	render() {
		return (
			<>
			{ this.props.loading &&
				<div className="auth loading">
					<div>
						<div className="cm-spinner"></div>
					</div>
				</div>
			}
			</>
		);

	}

}

export default Loader;
