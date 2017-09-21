import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'
import _ from 'underscore/underscore'
import moment from 'moment/moment'
import { LineChart, ColumnChart } from 'react-chartkick'

import { connect } from 'react-redux'


class ThingTrends extends React.Component {

    render() {
        const subreddit = this.props.subreddit
        return (
            <div className="container">
                <div className="content thing-trends rounded">
                    <div className="row">
                        <div className="col">
                            <div className="heading mt-3 mb-3 pt-3 pb-3">
                                <h1 className="display-4">{'/r/' + this.props.subreddit}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <LineChart  ytitle="Count of things" data={"/things/s/" + subreddit + "/by_day"} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <ColumnChart xtitle="Authors" ytitle="Count of things" data={"/things/s/" + subreddit + "/by_author"} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        subreddit: state.subreddit,
    }
}

ThingTrends = connect(mapStateToProps)(ThingTrends)

export default ThingTrends
