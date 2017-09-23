import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'
import _ from 'underscore/underscore'
import moment from 'moment/moment'

import { connect } from 'react-redux'
import Showdown from 'showdown/dist/showdown'
import Utils from 'global/utils'

class Thing extends React.Component {
    getLink() {
        return this.props.thing.amazon_link + '?tag=benrudolph-20'
    }
    getContext() {
        const thing = this.props.thing
        const converter = new Showdown.Converter()
        const html = converter.makeHtml(thing.comment.body)
        const text = $(html).text()
        return text.slice(0, 300)
    }

    render() {
        const thing = this.props.thing
        let date = 'No date'
        if (thing.created_utc) {
            date = moment(thing.created_utc).format('MMM Do YYYY')
        }
        return (
            <div className="row">
                <div className="col d-flex mt-3 mb-3 flex-column flex-md-row">
                    <div className="thing-img mx-3" style={{backgroundImage: 'url(' + thing.amazon_image + ')'}}></div>
                    <div className="copy">
                        <h4 className="light">
                            <small>
                                <span className="badge badge-info light">{thing.score} karma</span>
                            </small>
                            &nbsp;&nbsp;
                            <a href={this.getLink()} target="_blank">{thing.product_title}</a>
                        </h4>
                        <p className="text-muted light">
                            <i>
                                {this.getContext()}...
                            </i>
                            <br />
                            <small>&#8211;&nbsp;{thing.comment.author}</small>
                        </p>
                        <small>
                            {date}&nbsp;|&nbsp;
                            <a href={'/comments/' + thing.comment_id}>View comment</a>&nbsp;|&nbsp;
                            <a href={thing.comment.thread_id} target="_blank">View on Reddit</a>
                        </small>
                    </div>
                </div>
                <hr className="w-100"/>
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
        const link = '/things/r/' + this.props.subreddit + '?page=' + this.props.page
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

        let pagesToShowLimit = 10
        if (window.width() < 768) {
            pagesToShowLimit = 5
        }
        const pagesToShow = Utils.pagesToShow(this.props.current_page, this.props.total_pages, pagesToShowLimit)
        const pageLinks = _.range(pagesToShow.start + 1, pagesToShow.end + 1).map((page) => {
            return <BootstrapPageLink subreddit={this.props.subreddit} currentPage={this.props.current_page} key={page} page={page} />
        })

        const nextUrl = '/things/r/' + this.props.subreddit + '?page=' + (this.props.current_page + 1)
        const prevUrl = '/things/r/' + this.props.subreddit + '?page=' + (this.props.current_page - 1)
        const nextKlass = this.props.current_page === this.props.total_pages ? 'page-item disabled' : 'page-item'
        const prevKlass = this.props.current_page === 1 ? 'page-item disabled' : 'page-item'

        const date = moment(this.props.year + '-' + this.props.month, 'YYYY-MM')

        return (
            <div className="container">
                <div className="content thing-list">
                    <div className="row">
                        <div className="col">
                            <div className="heading mt-3 mb-3 pt-3 pb-3">
                                <span className="text-muted light"><i>The best things found in...</i></span>
                                <h1 className="display-4">{'/r/' + this.props.subreddit}</h1>
                            </div>
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
        total_things: state.total_things,
        current_page: state.current_page,
        total_pages: state.total_pages,
    }
}

ThingList = connect(mapStateToProps)(ThingList)

export default ThingList
