import React from 'react';
import Highcharts from 'highcharts';
// useEffect hook can be used here
export default class HighchartsWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.graph = React.createRef();
  }

  createChart() {
    this.chart = Highcharts.chart(this.graph.current, defaultConfig);
  }

  render() {
    return <div ref={this.graph} />;
  }

  componentDidMount() {
    this.createChart();
    this.chart.update({
      ...defaultConfig,
      series: [
        {
          name: 'Detailed',
          data: this.cleanForHighcharts(this.props.data.prices.detailed)
        },
        {
          name: 'Aggregated',
          data: this.cleanForHighcharts(this.props.data.prices.aggregated)
        }
      ]
    });
  }

  //our Highcharts is expecting date objects, and x and y coordinates
  //so let's clean up array to be more friendly
  cleanForHighcharts(arr) {
    return arr.map(el => {
      let addedElement = {};
      addedElement.x = new Date(el.date);
      addedElement.y = el.price;
      return addedElement;
    });
  }
  componentDidUpdate() {
    console.log('highcharts component did update with new data: ');
    console.log(this.props.data);

    if (this.chart) {
      this.chart.update({
        ...defaultConfig,
        series: [
          {
            name: 'Detailed',
            data: this.cleanForHighcharts(this.props.data.prices.detailed)
          },
          {
            name: 'Aggregated',
            data: this.cleanForHighcharts(this.props.data.prices.aggregated)
          }
        ]
        //series: this.props.data
      });
    } else {
      this.createChart();
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }
}

const defaultConfig = {
  chart: {
    type: 'line'
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    type: 'datetime',

    labels: {
      formatter: function() {
        return Highcharts.dateFormat('%e %b %y', this.value);
      }
    },
    dateTimeLabelFormats: {
      second: '%Y-%m-%d<br/>%H:%M:%S',
      minute: '%Y-%m-%d<br/>%H:%M',
      hour: '%Y-%m-%d<br/>%H:%M',
      day: '%Y<br/>%m-%d',
      week: '%Y<br/>%m-%d',
      month: '%Y-%m',
      year: '%Y'
    }
  },
  title: {
    text: 'Stock Prices'
  },
  tooltip: {
    formatter: function() {
      return (
        'x: ' +
        Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) +
        ' y: ' +
        this.y.toFixed(2)
      );
    }
  },
  series: [{}, {}]
};
