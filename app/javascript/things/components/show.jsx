import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Showdown from 'showdown/dist/showdown'


class ThingShow extends React.Component {
    render() {
        const thing = this.props.thing
        const converter = new Showdown.Converter()
        return (
            <div className="container content thing-show rounded">
                <div className="comment-body">
                    <h2 className="mb-3">{'/r/' + thing.subreddit}</h2>
                    <p className="comment-text light" dangerouslySetInnerHTML={{ __html: converter.makeHtml(thing.body) }} >
                    </p>
                    <small className="text-muted">~&nbsp;{thing.author}</small>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        thing: state.thing
    }
}

ThingShow = connect(mapStateToProps)(ThingShow)

export default ThingShow
