import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ThingFilters from 'things/components/filters'

class MainHeader extends React.Component {

    render() {
        const favorites = this.props.favorites.map((f, i) => {
            let klass = ''
            if (i > 5) {
                klass += 'd-none d-lg-block'
            }
            else if (i > 4) {
                klass += 'd-none d-md-block'
            }
            else if (i > 2) {
                klass += 'd-none d-sm-block'
            }
            return <a className={klass} href={"/things/s/" + f } key={i}>{'/r/' + f}</a>
        })
        return (
            <div>
                <nav className="navbar navbar-light bg-faded">
                    <a className="navbar-brand" href="/">ThingsOnReddit</a>
                    <ul className="navbar-nav mr-auto"></ul>
                    <ThingFilters />
                </nav>
                <div className="d-flex favorites align-items-stretch">
                    <span className="favorite-label">Popular</span>
                    <div className="d-flex favorite-links justify-content-around light w-100">
                        {favorites}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites,
    }
}

MainHeader = connect(mapStateToProps)(MainHeader)

export default MainHeader
