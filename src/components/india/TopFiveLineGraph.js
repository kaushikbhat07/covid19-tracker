import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Line } from 'react-chartjs-2';

class TopFiveLineGraph extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            chartOptions: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Covid-19 cases Indian state-wise (Top 10)',
                    fontSize: 18
                },
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        });
    };

    printChart() {
        if (this.props.isLoaded === true && this.props.error === null) {
            return (
                <Line data={this.props.data} options={this.state.chartOptions} height={500} />
            );
        } else if (this.props.isLoaded === false && this.props.error === null) {
            return (
                <div className="text-center">
                    <img alt="Loading..." src="assets/images/loader.gif" />
                </div>
            );
        } else if (this.props.isLoaded === false && this.props.error !== null) {
            return (
                <div className="text-center">
                    <i className="fa fa-exclamation-triangle"></i>
                </div>
            );
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="mb-4">
                    <Card className="shadow">
                        <CardBody>
                            <CardText>
                                {this.printChart()}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default TopFiveLineGraph;