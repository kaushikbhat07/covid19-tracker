import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

class PieChart extends Component {
	render() {
		return (
			<React.Fragment>
				<Card className="shadow">
					<CardBody>
						<CardTitle>Piechart</CardTitle>
						<CardText>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente incidunt veniam mollitia consequatur beatae libero rem perferendis perspiciatis nam deserunt adipisci, doloremque dolores esse pariatur et cumque! Dicta, iure aliquam?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor unde quia iure blanditiis eum, ullam commodi. Voluptas odit voluptatem, obcaecati autem id quisquam tempore, quae saepe ab quia ea molestias?Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum aliquid adipisci a voluptatum debitis qui ut nesciunt id necessitatibus dolore, error ducimus deserunt explicabo! Dolorum ad ratione incidunt laborum corrupti?
						</CardText>
					</CardBody>
				</Card>
			</React.Fragment>
		);
	}
}

export default PieChart;