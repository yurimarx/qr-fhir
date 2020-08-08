import React, { Component } from 'react';

export class AppFooter extends Component {

    render() {
        return <div className="layout-footer">
            <div className="p-grid">
                <div className="p-col">
                    <img src="assets/layout/images/logo-white.png" alt="sapphire-layout" />
                    <div className="layout-footer-appname">QR Code to Patient FHIR Resource</div>
                </div>
                <div className="p-col p-col-align-right">
                    <span>MIT License</span>
                </div>
            </div>
        </div>
    }
}