import React, { Component } from "react";
import FrappeChart from "frappe-charts/dist/frappe-charts.min.esm";
import Box from "../../../components/utility/papersheet";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import Button from "../../../components/uielements/button";
import {
  Row,
  HalfColumn,
  FullColumn
} from "../../../components/utility/rowColumn";
import * as configs from "./config";
import "frappe-charts/dist/frappe-charts.min.css";

export default class extends Component {
  state = {
    currentIndex: 2
  };
  componentDidMount() {
    new FrappeChart(configs.barChart);
    new FrappeChart(configs.lineChart);
    new FrappeChart(configs.scatterChart);
    new FrappeChart(configs.pieChart);
    new FrappeChart(configs.percentageChart);
    new FrappeChart(configs.heatMap);
    new FrappeChart(configs.heatMapHalloween);
    this.updatedChart = new FrappeChart(configs.updatedChart);
  }
  addData = () => {
    let { currentIndex } = this.state;
    currentIndex += 1;
    const data = configs.basicData.datasets[currentIndex % 3];
    this.updatedChart.add_data_point(data.values, data.title);
    this.setState({ currentIndex });
  };
  removeData = () => {
    const { currentIndex } = this.state;
    if (currentIndex > 0) {
      this.updatedChart.remove_data_point(currentIndex);
      this.setState({ currentIndex: currentIndex - 1 });
    }
  };
  render() {
    return (
      <LayoutWrapper className="mapPage">
        <Row>
          <FullColumn>
            <Box title={configs.updatedChart.header}>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={this.addData} style={{ marginRight: "10px" }}>
                  + Add Value
                </Button>
                <Button onClick={this.removeData}>Remove Value</Button>
              </div>
              <div id={configs.updatedChart.parentId} />
            </Box>
          </FullColumn>
        </Row>
        <Row>
          <FullColumn>
            <Box title={configs.barChart.header}>
              <div id={configs.barChart.parentId} />
            </Box>
          </FullColumn>
        </Row>
        <Row>
          <FullColumn>
            <Box title={configs.lineChart.header}>
              <div id={configs.lineChart.parentId} />
            </Box>
          </FullColumn>
        </Row>

        <Row>
          <FullColumn>
            <Box title={configs.scatterChart.header}>
              <div id={configs.scatterChart.parentId} />
            </Box>
          </FullColumn>
        </Row>

        <Row>
          <HalfColumn>
            <Box title={configs.heatMap.header}>
              <div id={configs.heatMap.parentId} />
            </Box>
          </HalfColumn>
          <HalfColumn>
            <Box title={configs.heatMapHalloween.header}>
              <div id={configs.heatMapHalloween.parentId} />
            </Box>
          </HalfColumn>
        </Row>
        <Row>
          <HalfColumn>
            <Box title={configs.pieChart.header}>
              <div id={configs.pieChart.parentId} />
            </Box>
          </HalfColumn>
          <HalfColumn>
            <Box title={configs.percentageChart.header}>
              <div id={configs.percentageChart.parentId} />
            </Box>
          </HalfColumn>
        </Row>
      </LayoutWrapper>
    );
  }
}
export { FrappeChart };
