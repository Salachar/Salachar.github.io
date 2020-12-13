import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';

import styles from './PieChart.module.css';

const PI = Math.PI;
const TWO_PI = PI * 2;
const HALF_PI = PI / 2;

class TableList extends Component {
  constructor(props = {}) {
    super(props);

    const { pieChart } = props;
    this.pieChart = pieChart; // Just to simplify some things

    this.state = {
      hoveredItem: null,
    };

    this.colors = {};
    this.percentages = {};
    this.total = 0;
    this.pieChartThickness = 40;

    this.canvasDimensions = {
      width: null,
      height: null,
      bound: null,
    };

    this.mouse = {};

    if (pieChart) {
      this.parseData();
      this.generateColors();
    }

    this.chartRef = React.createRef();
    this.onPieChartMouseMove = this.onPieChartMouseMove.bind(this);
  }

  componentDidMount() {
    this.drawPieChart();
  }

  componentDidUpdate(prevProps) {
    const { data : prevData } = prevProps;
    const { data } = this.props;

    if (this.pieChart && !isEqual(Object.keys(prevData), Object.keys(data))) {
      this.parseData();
      this.generateColors();
    }

    this.drawPieChart();
  }

  parseData() {
    const { data } = this.props;
    this.total = 0;
    Object.keys(data).forEach(k => (this.total += data[k]));
    this.percentages = {};
    Object.keys(data).forEach(k => (this.percentages[k] = data[k] / this.total));
  }

  generateColors() {
    const { data, pieChart } = this.props;
    if (!pieChart) return;
    let colorCount = 1;
    Object.keys(data).forEach((k, index) => {
      // Generate an HSL color to use, its easier to get more eye friendly
      // pastel colors from HSL

      let hue = null;
      const modifier = 10 - Math.floor(Math.random() * 20);
      switch(colorCount) {
        case 1: // red
          hue = 0;
          break;
        case 2: // green
          hue = 100;
          break;
        case 3: // orange
          hue = 30;
          break;
        case 4: // blue
          hue = 220;
          break;
        case 5: // yellow
          hue = 57;
          break;
        case 6: // purple
          hue = 277;
          break;
        default:
          break;
      }

      hue += modifier;
      if (hue < 0) hue = 360 + hue;
      if (hue > 360) hue = hue - 360;

      colorCount += 1;
      if (colorCount > 6) colorCount = 1;

      this.colors[k] = `hsla(${hue}, 95%, 67%, 1)`;
    });
  }

  drawPieChart() {
    if (!this.pieChart) return;
    const canvas = this.chartRef.current;
    if (!canvas) return null;
    const { hoveredItem } = this.state;
    const { backgroundColor } = this.props;

    // The canvas itself is weird and needs to explicity have its width and height set
    // Otherwise the drawing area will be distorted
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    const bound = width > height ? height : width;

    this.canvasDimensions.width = width;
    this.canvasDimensions.height = height;
    this.canvasDimensions.bound = bound;

    // Clear out the canvas for drawing
    const c = canvas.getContext('2d');
    c.clearRect(0, 0, width, height);

    c.save();
      // Translate the drawing origin to the center of the canvas
      // Makes it easier to draw the arcs/slices
      c.globalCompositeOperation = "source-over";
      c.translate(width / 2, height / 2);

      c.beginPath();
      c.arc(0, 0, bound / 2, 0, 2 * Math.PI);
      c.fillStyle = backgroundColor;
      c.fill();

      // We want the first item to start at 12 o'clock so we need our starting
      // angle to be offset to negative half pi.
      let start = 0 - HALF_PI;
      let end = 0;
      // Draw the colored pie chart chunks
      Object.keys(this.percentages).forEach((item) => {
        end = start + (TWO_PI * this.percentages[item]);
        c.lineWidth = this.pieChartThickness;
        // c.strokeStyle = (item === hoveredItem) ? '#FF0000' : this.colors[item];
        c.strokeStyle = this.colors[item];
        c.beginPath();
        if (item === hoveredItem) {
          c.lineWidth = this.pieChartThickness + 15;
          c.arc(0, 0, (bound / 2) - this.pieChartThickness, start, end);
        } else {
          c.arc(0, 0, (bound / 2) - this.pieChartThickness, start, end);
        }

        c.stroke();
        start = end;
      });

      start = 0 - HALF_PI;
      end = 0;
      // Draw lines over the start/end of the chunks
      // as a slight border/boundary between them.
      // Destination out means these line will be cut out of the
      // image instead of drawn, this will make them transparent
      // c.globalCompositeOperation = "destination-out";
      c.lineWidth = 2;
      c.strokeStyle = backgroundColor;
      Object.keys(this.percentages).forEach((item) => {
        end = start + (TWO_PI * this.percentages[item]);
        this.canvasBorderLine(c, start + HALF_PI);
        this.canvasBorderLine(c, end + HALF_PI);
        start = end;
      });
    c.restore();
  }

  canvasBorderLine(c, angle) {
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(Math.sin(angle) * 100, Math.cos(angle) * -100);
    c.stroke();
  }

  checkForPieChartHover() {
    let hoveredItem = null;

    // Distance from center of pie chart to the mouse on the canvas
    const distance = Math.sqrt((this.mouse.x * this.mouse.x) + (this.mouse.y * this.mouse.y));

    const arcCenter =  (this.canvasDimensions.bound / 2) - this.pieChartThickness;
    const innerRadius = arcCenter - (this.pieChartThickness / 2);
    const outerRadius = arcCenter + (this.pieChartThickness / 2);

    if (distance >= innerRadius && distance <= outerRadius) {
      // We are hovering over the pie chart now and just need to determine the slice
      let angle = Math.atan2(this.mouse.y, this.mouse.x);
      // 12 o'clock on a unit circle is negative half pi, but to our pie chart items
      // its 0, so we need to adjust the mouse angle to match the same bounds
      if (angle < -(Math.PI / 2)) angle = Math.PI + (Math.PI + angle);

      let start = 0 - HALF_PI;
      let end = 0;
      Object.keys(this.percentages).forEach((item) => {
        end = start + ((Math.PI * 2) * this.percentages[item]);
        if (angle >= start && angle <= end) hoveredItem = item;
        start = end;
      });
    }

    this.setState({ hoveredItem });
  }

  getMousePos(e) {
    const canvas = this.chartRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) - (width / 2),
      y: (e.clientY - rect.top) - (height / 2)
    };
  }

  onItemOver(item) {
    this.setState({
      hoveredItem: item,
    });
  }

  onItemLeave(item) {
    this.setState({
      hoveredItem: null,
    });
  }

  onPieChartMouseMove(e) {
    this.mouse = this.getMousePos(e);
    this.checkForPieChartHover();
  }

  renderPieChart() {
    const { hoveredItem } = this.state;
    return (
      <div className={styles.pie_chart_wrapper}>
        <canvas
          ref={this.chartRef}
          className={styles.pie_chart}
          onMouseMove={this.onPieChartMouseMove}
        />
        {hoveredItem && (
          <Fragment>
            <div className={styles.pie_chart_percentage}>{parseInt(this.percentages[hoveredItem] * 100)}%</div>
            <div className={styles.pie_chart_text}>{hoveredItem}</div>
          </Fragment>
        )}
      </div>
    );
  }

  render() {
    const {
      data,
      order,
      pieChart,
      className,
    } = this.props;
    const { hoveredItem } = this.state;

    Object.keys(data).forEach((key) => {
      if (!data[key]) data[key] = `No ${key} provided`;
    });

    const orderedKeys = (order && order.length) ? order : Object.keys(data);
    const classname = classnames(className, styles.details, {
      [styles.pie_chart_showing]: pieChart
    });

    return (
      <div className={classname}>
        {pieChart && this.renderPieChart()}
        <table className={classnames({ [styles.with_pie_chart]: pieChart })}>
          <tbody>
            {orderedKeys.map(dataKey => (
              <tr
                key={`alert_row_key_${dataKey.toLowerCase().replace(/ /g, '_')}`}
                onMouseOver={() => { this.onItemOver(dataKey); }}
                onMouseLeave={() => { this.onItemLeave(); }}
                className={classnames({ [styles.pie_chart_row_hover]: hoveredItem === dataKey })}
              >
                {pieChart && (
                  <td className={styles.pie_chart_legend_td}>
                    <div className={styles.pie_chart_legend} style={{background: this.colors[dataKey]}} />
                  </td>
                )}
                <td>{dataKey}</td>
                {pieChart && <td>{`${data[dataKey]} (${parseInt(this.percentages[dataKey] * 100)}%)`}</td>}
                {!pieChart && <td>{data[dataKey]}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TableList.propTypes = {
  data: propTypes.object.isRequired,
  order: propTypes.array,
  pieChart: propTypes.bool,
  className: propTypes.string,
  backgroundColor: propTypes.string,
};

TableList.defaultProps = {
  pieChart: false,
  className: '',
  backgroundColor: '#FFF',
};

export default TableList;
