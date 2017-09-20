import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


class MainHeader extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-faded">
              <a className="navbar-brand" href="#">Things on Reddit</a>
            </nav>
        )
    }
}

export default MainHeader
