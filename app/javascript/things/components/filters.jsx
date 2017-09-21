import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import AutoComplete from 'global/auto_complete.js'
import Subreddits from 'global/subreddits'

class ThingFilters extends React.Component {
    constructor() {
        super()
        this.state = { subreddit: null };
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
            },
        })
    }

    onChange(e) {
        this.setState({ subreddit: e.target.value })
    }

    render() {
        return (
            <form className="form-inline" method="GET" action={'/things/' + this.state.subreddit + '/'}>
                <div className="input-group">
                  <input onChange={this.onChange.bind(this)} id="subreddit-filter" placeholder="Choose a subreddit" className="form-control no-border-radius" type="text" />
                  <span className="input-group-btn">
                    <input type="submit" className="btn btn-primary no-border-radius" value="Go!" />
                  </span>
                </div>
            </form>
        )
    }
}

export default ThingFilters
