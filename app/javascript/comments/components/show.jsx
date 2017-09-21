import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Showdown from 'showdown/dist/showdown'

class ThingSnippet extends React.Component {
    getLink() {
        return this.props.thing.amazon_link + '?tag=benrudolph-20'
    }
    render() {
        const thing = this.props.thing
        return (
            <div className="d-flex">
                <div className="thing-img-thumb mx-3" style={{backgroundImage: 'url(' + thing.amazon_image + ')'}}></div>
                <a href={this.getLink()} className="align-self-center" target="_blank">{thing.product_title}</a>
            </div>
        )
    }
}

class CommentShow extends React.Component {
    render() {
        const comment = this.props.comment
        const converter = new Showdown.Converter()
        const thingSnippets = comment.things.map((thing, i) => {
            return <ThingSnippet key={i} thing={thing} />
        })
        return (
            <div className="container content comment-show rounded">
                <div className="comment-body">
                    <h2 className="mb-3">{'/r/' + comment.subreddit}</h2>
                    <p className="comment-text light" dangerouslySetInnerHTML={{ __html: converter.makeHtml(comment.body) }} >
                    </p>
                    <small className="text-muted">~&nbsp;{comment.author}</small>
                    <hr />
                    <h4 className="lead mb-3">Recommended Things</h4>
                    {thingSnippets}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comment: state.comment
    }
}

CommentShow = connect(mapStateToProps)(CommentShow)

export default CommentShow
