// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import $ from 'jquery/dist/jquery'

import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'

import MainHeader from 'global/components/main_header'
import ThingShow from 'things/components/show'

let store;
const loggerMiddleware = createLogger()

document.addEventListener('DOMContentLoaded', () => {
  const initialData = $('#initial-data').data().initialData

  const state = {
    thing: initialData.thing
  }

  store = createStore(
    (state) => { return state },
    state,
    applyMiddleware(
      loggerMiddleware,
    )
  )

  ReactDOM.render(
    <Provider store={store}>
      <div>
        <MainHeader />
        <ThingShow />
      </div>
    </Provider>,
    document.getElementById('react-container'),
  )
})

