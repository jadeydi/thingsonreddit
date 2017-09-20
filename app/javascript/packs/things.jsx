// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MainHeader from 'global/components/main_header'
import ThingList from 'things/components/list'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <MainHeader />
      <ThingList />
    </div>,
    document.getElementById('react-container'),
  )
})
