import React, { Component } from 'react';
import { Card, CardBody, CardText } from 'reactstrap';
import { Line } from 'react-chartjs-2';

class TopFiveBarChart extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            chartOptions: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: 'Global ratio (Top 10)',
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
        if (this.props.isLoaded === true) {
            return (
                <Line data={this.props.data} options={this.state.chartOptions} height={450} />
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
                <div className="">
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

export default TopFiveBarChart;