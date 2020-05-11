import React from 'react';
import logo from './logo.svg';
import '../public/favicon.ico';
import '../public/logo192.png';

import './App.css';
import { Switch, Route, withRouter} from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Header from './components/header';
import Products from './pages/products/index';

@inject("ProductsStore")
@observer
export default class App extends React.Component {
  headerSearch() {
    this.props.ProductsStore.getProducts()
  }

  searchChange(val) {
    this.props.ProductsStore.onTypeSearch(val)
  }

  render() {
    return (
      <div>
        <Header 
          goSearch={() => {this.headerSearch()}}
          searchVal={this.props.ProductsStore.searchVal}
          onSeachFieldChange = {(val) => this.searchChange(val)}
        />
        <Switch>
          <Route path="/" component= { Products } exact={true} />
        </Switch>
      </div>
    )
  }
}
