import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import Showdown from 'showdown/dist/showdown'


class ThingShow extends React.Component {
    getLink() {
        return this.props.thing.amazon_link + '?tag=benrudolph-20'
    }
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
                    <hr />
                    <h4 className="lead mb-3">Recommended Things</h4>
                    <div className="d-flex">
                        <div className="thing-img-thumb mx-3" style={{backgroundImage: 'url(' + thing.amazon_image + ')'}}></div>
                        <a href={this.getLink()} className="align-self-center" target="_blank">{thing.product_title}</a>
                    </div>
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
