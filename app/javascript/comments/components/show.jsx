import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'
import _ from 'underscore/underscore'

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

    decodeEntities(encodedString) {
        // https://stackoverflow.com/a/31350391/835696
        let textArea = document.createElement('textarea');
        textArea.innerHTML = encodedString;
        return textArea.value;
    }

    renderBody() {
        const comment = this.props.comment
        const converter = new Showdown.Converter()
        const body = converter.makeHtml(comment.body)
        const $body = $('<div>' + body + '</div>')
        const self = this

        // First let's see if we can replace any of the links
        $body.find('a').each(function(idx) {
            let $a = $(this)
            const href = $a.attr('href')
            comment.things.forEach((thing) => {
                // Sometimes there is a trailing paren on the link. This trims it
                console.log(thing.original_link)
                const cleanedHref = self.decodeEntities(thing.original_link.slice(0, -3))
                console.log(cleanedHref)
                if (href.includes(cleanedHref)) {
                    $a.attr('href', thing.amazon_link + '?tag=benrudolph-20')
                }
            })
        })

        return $body.html()
    }

    render() {
        const comment = this.props.comment
        const thingSnippets = comment.things.map((thing, i) => {
            return <ThingSnippet key={i} thing={thing} />
        })
        return (
            <div className="container content comment-show rounded">
                <div className="comment-body">
                    <h2 className="mb-3">{'/r/' + comment.subreddit}</h2>
                    <blockquote className="blockquote">
                        <p className="comment-text light" dangerouslySetInnerHTML={{ __html: this.renderBody() }} >
                        </p>
                        <footer className="blockquote-footer"><small className="text-muted">{comment.author}</small></footer>
                    </blockquote>
                    <br />
                    <small><a target="_blank" href={comment.thread_id}>View on Reddit</a></small>
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
