import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'
import { connect } from 'react-redux'

import AutoComplete from 'global/auto_complete.js'
import Subreddits from 'global/subreddits'
import Utils from 'global/utils'

class ThingFilters extends React.Component {
    constructor() {
        super()
        this.state = { subreddit: '' };
    }

    componentDidMount() {
        new AutoComplete({
            selector: '#subreddit-filter',
            minChars: 1,
            source: function(term, suggest) {
                const cleanTerm = term.toLowerCase()
                suggest(Subreddits.filter((s) => { return s.toLowerCase().startsWith(cleanTerm) }))
            },
            onSelect: (event, term, item) => {
                this.setState({ subreddit: term })
                $('#subreddit-form').submit()
            },
        })
    }

    onChange(e) {
        this.setState({ subreddit: e.target.value })
    }

    randomSubreddit() {
        const randomSub = Subreddits[Math.floor(Math.random() * Subreddits.length)]
        this.setState({ subreddit: randomSub }, () => {
            $('#subreddit-form').submit()
        })
    }

    render() {
        const link = Utils.subredditLink(this.state.subreddit, this.props.order_by)
        return (
            <div className="d-flex">
                <form id="subreddit-form" className="form-inline" method="GET" action={link}>
                    <div className="input-group">
                      <input
                            onChange={this.onChange.bind(this)}
                            id="subreddit-filter"
                            placeholder="Choose a subreddit"
                            value={this.state.subreddit}
                            className="form-control no-border-radius" type="text" />
                      <span className="input-group-btn">
                        <input type="submit" className="btn btn-primary no-border-radius" value="Go!" />
                      </span>
                    </div>
                </form>
                <button type="button" onClick={this.randomSubreddit.bind(this)} className="btn btn-primary rounded-0 ml-2">I'm feeling lucky!</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        order_by: state.order_by,
    }
}

ThingFilters = connect(mapStateToProps)(ThingFilters)

export default ThingFilters
