import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Logo from '../../../assets/images/logo_small.png'

import ThingFilters from 'things/components/filters'
import Utils from 'global/utils'

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
            const link = Utils.subredditLink(f, this.props.order_by)
            return <a className={klass} href={link} key={i}>{'/r/' + f}</a>
        })
        return (
            <div>
                <nav className="navbar navbar-light pb-1 pt-1 bg-faded">
                    <a className="navbar-brand logo mr-3" href="/">
                        <img src={Logo} height="40" alt="ThingsOnReddit" />
                    </a>
                    <ul className="navbar-nav mr-auto d-flex flex-row">
                        <li className="nav-item">
                          <a className="nav-link" href="/about">About</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" data-toggle="modal" data-target="#newsletter-modal">Newsletter</a>
                        </li>
                    </ul>
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
        order_by: state.order_by,
    }
}

MainHeader = connect(mapStateToProps)(MainHeader)

export default MainHeader
