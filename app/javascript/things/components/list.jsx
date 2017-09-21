import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'

import { connect } from 'react-redux'
import Showdown from 'showdown/dist/showdown'

class Thing extends React.Component {
    getLink() {
        return this.props.thing.amazon_link + '?tag=benrudolph-20'
    }
    getContext() {
        const thing = this.props.thing
        const converter = new Showdown.Converter()
        const html = converter.makeHtml(thing.body)
        const text = $(html).text()
        return text.slice(0, 100)
    }
    render() {
        const thing = this.props.thing
        return (
            <div className="row">
                <div className="col d-flex mt-3 mb-3">
                    <div className="thing-img mx-3" style={{backgroundImage: 'url(' + thing.amazon_image + ')'}}></div>
                    <div className="copy">
                        <h4 className="light">
                            <span className="badge badge-info">{thing.score}</span>&nbsp;&nbsp;
                            <a href={this.getLink()} target="_blank">{thing.product_title}</a>
                        </h4>
                        <p className="text-muted light">
                            <i>
                            ...{this.getContext()}...
                            </i>
                        </p>
                        <small>
                            By: {thing.author}&nbsp;|&nbsp;
                            <a href={'/things/' + thing.id}>View comment</a>
                        </small>
                    </div>
                </div>
            </div>
        )
    }

}

class ThingList extends React.Component {
    render() {
        const things = this.props.things.map((thing, i) => {
            return (
                <Thing thing={thing} key={i} />
            )
        })
        return (
            <div className="container content thing-list rounded">
                <div className="row">
                    <div className="col">
                        <h1 className="display-4 m-3 pt-3 pb-3">{'/r/' + this.props.subreddit}</h1>
                    </div>
                </div>
                {things}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        subreddit: state.subreddit,
        things: state.things,
    }
}

ThingList = connect(mapStateToProps)(ThingList)

export default ThingList
