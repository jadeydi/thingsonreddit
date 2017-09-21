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
                <div className="col d-flex">
                    <div className="thing-img-container mx-3">
                        <img src="http://via.placeholder.com/100x100" width="100" height="100" />
                    </div>
                    <div className="content">
                        <h3 className="light">
                            <a href={'https://www.' + thing.amazon_link} target="_blank">Product Name</a>
                        </h3>
                        <p className="text-muted light">
                            <i>
                            ...{this.getContext()}...
                            </i>
                        </p>
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
            <div className="container">
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
