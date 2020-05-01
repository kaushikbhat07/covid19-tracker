import React, { Component } from 'react';
import Numbers from './numbers';
import PieChart from './PieChart';
import SamplesTested from './SamplesTested';

class IndiaPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numbers: {
                isLoaded: false,
                error: null,
                items: null
            },
            piechart: {
                isLoaded: false,
                error: null,
                items: null
			},
			samplesTested: {
                isLoaded: false,
                error: null,
				items: null
			}
        }
    }
    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch("https://api.covid19india.org/data.json")
            .then(res => res.json())
            .then(
                result => {
                    if (result['cases_time_series'] !== undefined) {
                        this.setState({
                            numbers: {
                                items: result['cases_time_series'][result['cases_time_series'].length - 1],
                                isLoaded: true,
                                error: null
                            },
                            piechart: {
                                data: {
                                    labels: ["Confirmed Cases", "Total Deaths", "Total Recovered"],
                                    datasets: [{
                                        label: "Effect of Covid-19 on India",
                                        backgroundColor: ['#007bff', '#f70c0c', '#28a745'],
                                        hoverBackgroundColor: ['#1d3557', '#d90429', '#134611'],
                                        borderColor: '#fff',
                                        data: [result['cases_time_series'][result['cases_time_series'].length - 1]['totalconfirmed'], result['cases_time_series'][result['cases_time_series'].length - 1]['totaldeceased'], result['cases_time_series'][result['cases_time_series'].length - 1]['totalrecovered']]
                                    }]
                                },
                                isLoaded: true,
                            },
                            samplesTested: {
								items: result['tested'][result['tested'].length - 1],
								error: null,
								isLoaded: true
                            }
                        });
                    }
                },
                error => {
                    this.getData();
                    this.setState({
                        numbers: {
                            isLoaded: false,
                            error: error
                        },
                        piechart: {
                            isLoaded: false,
                            error: error
						},
                        samplesTested: {
                            isLoaded: false,
                            error: error
                        }    						
                    });
                }
            );
    }

    render() {
        return (
            <div className="container container-wrapper mt-4">
                <div className="content-box-md">
                    <div className="row">
                        <div className="col-md-8">
                            <Numbers isLoaded={this.state.numbers.isLoaded} error={this.state.numbers.error} items={this.state.numbers.items} />
                            <SamplesTested items={this.state.samplesTested.items} error={this.state.samplesTested.error} isLoaded={this.state.samplesTested.isLoaded} />
                        </div>
                        <div className="col-md-4">
                            <PieChart data={this.state.piechart.data} isLoaded={this.state.piechart.isLoaded} error={this.state.piechart.error} />
                            {/* <PieChart data={this.state.piechart.data} isLoaded={this.state.piechart.isLoaded} error={this.state.piechart.error} /> */}
                        </div>
                    </div>
                </div>
                <div className="content-box-md">
                    <div className="row">
                        <div className="col-md-8 content-box-xs">
                            {/* <HomeTable items={this.state.hometable.items} isLoaded={this.state.hometable.isLoaded} error={this.state.hometable.error} />
							<LineChart isLoaded={this.state.linechart.isLoaded} error={this.state.linechart.error} data={this.state.linechart.data} /> */}
                        </div>
                        <div className="col-md-4">
                            {/* <TopFive isLoaded={this.state.topfive.isLoaded} error={this.state.topfive.error} data={this.state.topfive.data} />

							<TopFiveBarChart isLoaded={this.state.topfivebarchart.isLoaded} error={this.state.topfivebarchart.error} data={this.state.topfivebarchart.data} /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IndiaPage;