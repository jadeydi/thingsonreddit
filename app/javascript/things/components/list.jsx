import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

class Thing extends React.Component {
    getContext() {
        const thing = this.props.thing
        return thing.body.slice(0, 100)
    }
    render() {
        const thing = this.props.thing
        return (
            <div className="row">
                <div className="col d-flex mt-3 mb-3">
                    <div className="thing-img-container mx-3">
                        <img src={thing.amazon_image} width="100" height="100" />
                    </div>
                    <div className="content">
                        <h4 className="light">
                            <a href={thing.amazon_link} target="_blank">{thing.product_title}</a>
                        </h4>
                        <p className="text-muted light">
                            <i>
                            ...{this.getContext()}...
                            </i>
                        </p>
                        <small>Suggested by: {thing.author}</small>
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
            <div className="container thing-list rounded">
            {things}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        things: state.things
    }
}

ThingList = connect(mapStateToProps)(ThingList)

export default ThingList
