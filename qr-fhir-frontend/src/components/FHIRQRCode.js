import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import QRCode from 'qrcode.react';
import { SelectButton } from 'primereact/selectbutton';
import fhir from 'fhir.js';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import vCardsJS from 'vcards-js';

export class FHIRQRCode extends Component {

    options = [
        { label: 'VCard', value: 'vcard' },
        { label: 'Content', value: 'content' }
    ];

    client = fhir({
        baseUrl: 'http://localhost:32783/fhir/r4',

        headers: {
            'Accept': 'application/fhir+json',
            'Content-Type': 'application/fhir+json;charset=UTF-8'
        }
    })

    constructor() {
        super();
        this.state = {
            option: 'vcard',
            patients: [],
            patient: {}
        };

        this.listPatients = this.listPatients.bind(this);

    }

    componentDidMount() {
        this.setState({ content: '' })
        this.listPatients();
    }

    listPatients() {
        this.client.search({
            type: 'Patient',
            query: {
                _sort: '-birthdate',
                _count: 5
            }
        }).then((response) => {

            var patientList = [];

            response.data.entry.forEach(element => {
                const patient = {
                    id: element.resource.id,
                    name: element.resource.name[0].family + ', ' + element.resource.name[0].given[0],
                    phone: element.resource.telecom[0].value
                }
                patientList.push(patient);
            });

            this.setState({
                patients: patientList,
                patient: patientList[0],
            });
        })
    }

    getVsCard() {
        var vCard = vCardsJS();
        vCard.firstName = this.state.patient.name;
        vCard.cellPhone = this.state.patient.phone;
        return vCard.getFormattedString();
    }

    render() {
        return (
            <div className="p-grid">

                <div className="p-col-9">
                    <div className="card card-w-title">
                        <div className="card-title">Select QR Option and the patient</div>
                        <div className="p-fluid">
                            <div className="p-col-3">
                                <SelectButton
                                    value={this.state.option}
                                    options={this.options}
                                    onChange={(e) => this.setState({ option: e.value })}></SelectButton>
                            </div>
                            <div className="p-field">
                                <h3>Patient</h3>
                                <Dropdown value={this.state.patient}
                                    options={this.state.patients}
                                    optionLabel="name"
                                    onChange={(e) => this.setState({ patient: e.value })}></Dropdown>
                            </div>

                            <br />
                            <Panel header="Content" toggleable={true}>
                                <div className="p-fluid">
                                    <div className="p-field">
                                        <h5>Patient name</h5>
                                        <InputText value={this.state.patient.name} />
                                    </div>
                                    <div className="p-field">
                                        <h5>Patient Phone</h5>
                                        <InputText value={this.state.patient.phone} />
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>


                <div className="p-col-3">
                    <div className="card card-w-title">
                        <div className="card-title">QRCode</div>
                        <Panel header="Result" toggleable={true}>
                            {this.state.option === 'content' && this.state.patient.name &&
                                <QRCode value={this.state.patient.name} />
                            }
                            {this.state.option === 'vcard' && this.state.patient.name &&
                                <QRCode value={this.getVsCard()} />
                            }
                        </Panel>
                    </div>
                </div>



            </div>
        );
    }
}