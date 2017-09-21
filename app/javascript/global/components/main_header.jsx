import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import ThingFilters from 'things/components/filters'

class MainHeader extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-faded">
                <a className="navbar-brand" href="/">ThingsOnReddit</a>
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/trends/">Trends</a>
                  </li>
                </ul>
                <ThingFilters />
            </nav>
        )
    }
}

export default MainHeader
