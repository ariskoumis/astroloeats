'use strict'

import React from 'react';
import {
    View,
    Text,
    Navigator
} from 'react-native';
import { Bar } from 'react-native-pathjs-charts'

export default class BarChartColumnBasic extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
                [{
                    v: 2,
                    name: "hi"
                }]
                ]
        }
        this._loadData = this._loadData.bind(this)
    }

    componentDidMount() {
        this._loadData()
    }

    _loadData() {
        var emotionTone = JSON.parse(JSON.parse(this.props.tone)).document_tone.tone_categories[0].tones
        var graphData = []
        emotionTone.forEach((category) => {
            var newTone = {
                name: category.tone_name,
                v: category.score * 100
            }
            graphData.push(newTone)
        })
        this.setState({
            data: [graphData]
        })
    }

    render() {
        let options = {
            width: 200,
            height: 200,
            margin: {
                top: 20,
                left: 25,
                bottom: 50,
                right: 20
            },
            color: '#2980B9',
            gutter: 20,
            animate: {
                type: 'oneByOne',
                duration: 200,
                fillTransition: 3
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 8,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        return (
          <View>
            <Bar style={{flex:1}} data={this.state.data} options={options} accessorKey='v'/>
          </View>
        )
    }
}
