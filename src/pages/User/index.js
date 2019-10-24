import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
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

  state = {
    stars: [],
    loading: false,
    loadingItens: false,
    perPage: 30,
    page: 1,
  };

  async componentDidMount() {
    const {stars, perPage} = this.state;
    const {navigation} = this.props;
    const {page} = this.state;
    const user = navigation.getParam('user');

    if (page === 1) this.setState({loading: true});

    const response = await api.get(
      `/users/${user.login}/starred?page=${page}&per_page=${perPage}`
    );

    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loading: false,
    });
  }

  handleNavigate = repo => {
    const {navigation} = this.props;
    navigation.navigate('WebViewPage', {repo});
  };

  loadRepositories = async () => {
    const {stars, perPage} = this.state;
    const {navigation} = this.props;
    const {page} = this.state;
    const user = navigation.getParam('user');

    this.setState({loadingItens: true});

    const response = await api.get(
      `/users/${user.login}/starred?page=${page}&per_page=${perPage}`
    );

    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loadingItens: false,
    });
  };

  render() {
    const {navigation} = this.props;
    const {stars, loading, loadingItens} = this.state;
    const user = navigation.getParam('user');

    const styles = StyleSheet.create({
      loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <Stars
            onEndReachedThreshold={0.2}
            onEndReached={this.loadRepositories}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => this.handleNavigate(item.html_url)}>
                <Starred>
                  <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </TouchableOpacity>
            )}
          />
        )}
        <ContainerLoading>
          {loadingItens ? <ActivityIndicator size="large" /> : null}
        </ContainerLoading>
      </Container>
    );
  }
}
