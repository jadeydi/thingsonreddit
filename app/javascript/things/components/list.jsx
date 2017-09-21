import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'
import _ from 'underscore/underscore'

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
                                {this.getContext()}...
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

class BootstrapPageLink extends React.Component {
    render() {
        let klass = 'page-item'
        if (this.props.currentPage === this.props.page) {
            klass += ' active'
        }
        const link = '/things/s/' + this.props.subreddit + '?page=' + this.props.page
        return (
            <li className={klass}>
                <a className="page-link" href={link}>
                    {this.props.page}
                </a>
            </li>
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
        const pageLinks = _.range(1, this.props.total_pages + 1).map((page) => {
            return <BootstrapPageLink subreddit={this.props.subreddit} currentPage={this.props.current_page} key={page} page={page} />
        })

        const nextUrl = '/things/s/' + this.props.subreddit + '?page=' + (this.props.current_page + 1)
        const prevUrl = '/things/s/' + this.props.subreddit + '?page=' + (this.props.current_page - 1)
        const nextKlass = this.props.current_page === this.props.total_pages ? 'page-item disabled' : 'page-item'
        const prevKlass = this.props.current_page === 1 ? 'page-item disabled' : 'page-item'

        return (
            <div className="container">
                <div className="content thing-list rounded">
                    <div className="row">
                        <div className="col">
                            <h1 className="display-4 mt-3 mb-3 pt-3 pb-3">{'/r/' + this.props.subreddit}</h1>
                        </div>
                    </div>
                    {things}
                    <div className="row mt-3 mb-3">
                        <div className="col">
                            <nav>
                              <ul className="pagination">
                                <li className={prevKlass}>
                                  <a className="page-link" href={prevUrl}>Previous</a>
                                </li>
                                {pageLinks}
                                <li className={nextKlass}>
                                  <a className="page-link" href={nextUrl}>Next</a>
                                </li>
                              </ul>
                            </nav>
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
        things: state.things,
        total_things: +state.total_things,
        current_page: +state.current_page,
        total_pages: +state.total_pages,
    }
}

ThingList = connect(mapStateToProps)(ThingList)

export default ThingList
