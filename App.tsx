import * as React from 'react'
import { View, StatusBar } from 'react-native'

import styled from 'styled-components'
import { Provider } from 'react-redux'

import MainScreen from 'screens/MainScreen'
import { store } from 'app/store'
import constants from 'utils/Constants.json'

export default function App() {
  return (
    <Provider store={store}>
      <ScreenContainer>
        <MainScreen />
        <StatusBar barStyle={'light-content'} />
      </ScreenContainer>
    </Provider>
  )
}

const ScreenContainer = styled(View)`
  flex: 1;
  display: flex;
  background-color: ${constants.colors.background};
`
