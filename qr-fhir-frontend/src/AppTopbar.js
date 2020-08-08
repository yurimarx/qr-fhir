import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppMenu } from "./AppMenu";

export class AppTopbar extends Component {

	static defaultProps = {
		menuActive: null,
		topbarUserMenuActive: false,
		model: null,
		horizontal: true,
		onRootMenuItemClick: null,
		onMenuItemClick: null,
		onSidebarClick: null,
		onMenuButtonClick: null,
		onTopbarUserMenuButtonClick: null,
		onTopbarUserMenuClick: null,
		isHorizontalMenuActive: null
	}

	static propTypes = {
		menuActive: PropTypes.bool.isRequired,
		topbarUserMenuActive: PropTypes.bool.isRequired,
		model: PropTypes.array.isRequired,
		horizontal: PropTypes.bool.isRequired,
		onRootMenuItemClick: PropTypes.func.isRequired,
		onMenuItemClick: PropTypes.func.isRequired,
		onSidebarClick: PropTypes.func.isRequired,
		onMenuButtonClick: PropTypes.func.isRequired,
		onTopbarUserMenuButtonClick: PropTypes.func.isRequired,
		onTopbarUserMenuClick: PropTypes.func.isRequired,
		isHorizontalMenuActive: PropTypes.func.isRequired
	}

	render() {
		let isMenuButtonActive = !this.props.isHorizontalMenuActive() && this.props.menuActive;
		let menuButtonClassName = classNames('layout-menubutton ', { 'layout-menubutton-active': isMenuButtonActive })

		return (
			<div className="layout-topbar">
				<button className={menuButtonClassName} onClick={(e) => this.props.onMenuButtonClick(e, isMenuButtonActive)}>
					<div className="layout-menubutton-icon" />
				</button>

				<div className="layout-topbar-grid">
					<div className="layout-topbar-grid-column layout-topbar-grid-column-fixed">
						<button className="layout-logo p-link" onClick={() => { window.location = "/#" }}>
							<img src="assets/layout/images/logo-white.png" alt="sapphire-layout" />
						</button>
					</div>

					<div className="layout-topbar-grid-column">
						<AppMenu model={this.props.model} horizontal={this.props.horizontal} menuActive={this.props.menuActive} isHorizontalMenuActive={this.props.isHorizontalMenuActive}
							onMenuItemClick={this.props.onMenuItemClick} onRootMenuItemClick={this.props.onRootMenuItemClick} onSidebarClick={this.props.onSidebarClick} />
					</div>

				</div>
			</div>
		);
	}
}