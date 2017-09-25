import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'
import _ from 'underscore/underscore'
import moment from 'moment/moment'
import Chartkick from 'chartkick/chartkick'
import { AreaChart, ColumnChart } from 'react-chartkick'

import { connect } from 'react-redux'


class ThingTrends extends React.Component {

    constructor() {
        super()

        Chartkick.options = {
          height: "400px",
          colors: ['#e5561c']
        }
    }

    render() {
        const subreddit = this.props.subreddit
        return (
            <div className="container">
                <div className="content thing-trends">
                    <div className="row">
                        <div className="col">
                            <div className="heading mt-3 mb-3 pt-3 pb-3">
                                <h1 className="display-4">{'/r/' + this.props.subreddit}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>
                                Discover trends about the things that people post to subreddits.
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4 className="light">
                                Number of things posted on /r/{subreddit} over time
                            </h4>
                            <AreaChart curve={true} ytitle="Number of things" data={"/things/r/" + subreddit + "/by_month"} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4 className="light">
                                Authors linking to the most things on /r/{subreddit}
                            </h4>
                            <ColumnChart xtitle="Authors" ytitle="Number of things" data={"/things/r/" + subreddit + "/by_author"} />
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
