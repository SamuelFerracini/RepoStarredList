import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
// import api from '../../services/api';

// import {
//   Container,
//   Header,
//   Avatar,
//   Bio,
//   Name,
//   Stars,
//   Starred,
//   OwnerAvatar,
//   Info,
//   Title,
//   ContainerLoading,
//   Author,
// } from './styles';

export default class WebViewPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('repo'),
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    repository: '',
  };

  componentDidMount() {
    const {navigation} = this.props;
    const repo = navigation.getParam('repo');
    this.setState({repository: repo});
  }

  render() {
    const {repository} = this.state;
    return <WebView source={{uri: repository}} style={{flex: 1}} />;
  }
}
