import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  ContainerLoading,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    return (
      <WebView source={{uri: 'https://infinite.red'}} style={{marginTop: 20}} />
    );
  }
}
