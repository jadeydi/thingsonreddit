import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

class ThingList extends React.Component {
    render() {
        return (
            <div className="container">
            List
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
