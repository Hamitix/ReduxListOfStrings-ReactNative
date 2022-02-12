import * as React from 'react'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import MainScreen from './modules/screens/MainScreen'

import styled from 'styled-components'

import { store } from './modules/app/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <ScreenContainer>
        <MainScreen />
        <StatusBar style="auto" />
      </ScreenContainer>
    </Provider>
  )
}

const ScreenContainer = styled(View)`
  flex: 1;
  display: flex;
  background-color: #3d3d3d;
`
