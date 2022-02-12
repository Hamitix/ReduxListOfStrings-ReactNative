import * as React from 'react'
import { View, FlatList, Text, Pressable, TextInput, SafeAreaView } from 'react-native'

import styled from 'styled-components'

import { useAppDispatch } from '../app/hooks'
import { getAllItemsFromStorage } from '../app/asyncStorage'

import constants from '../utils/Constants.json'

const MainScreen = () => {
  const dispatch = useAppDispatch()

  const [inputText, setInputText] = React.useState('')
  const [allKeysValuePairs, setAllKeysValuePairs] = React.useState<[string, string | null][]>([])

  React.useEffect(() => {
    getAllElements()
  }, [])

  const getAllElements = async () => {
    try {
      const keyValuePairs = await getAllItemsFromStorage()
      if (!!keyValuePairs) {
        setAllKeysValuePairs(keyValuePairs)
      }
    } catch (err) {
      console.log(`Error while retriving elements from in AsyncStorage : `, err)
    }
  }

  const addElement = () => {
    const nextElementID =
      allKeysValuePairs.length > 0 ? (allKeysValuePairs[allKeysValuePairs.length - 1][0] + 1).toString() : '0'
    dispatch({
      type: constants.reducerActions.addElement,
      payload: {
        nextID: nextElementID,
        value: inputText,
      },
    })
    setAllKeysValuePairs([...allKeysValuePairs, [nextElementID, inputText]])
    setInputText('')
  }

  const deleteElement = (item: [string, string | null]) => {
    dispatch({
      type: constants.reducerActions.removeElement,
      payload: {
        keyInAsyncStorage: item[0],
        value: item[1],
      },
    })
    setAllKeysValuePairs(allKeysValuePairs.filter((keyValue) => keyValue[0] !== item[0]))
  }

  const deleteAllElements = () => {
    dispatch({
      type: constants.reducerActions.reset,
    })
    setAllKeysValuePairs([])
  }
  const renderItem = ({ item }: { item: [string, string | null] }) => (
    <HorizontalContainer>
      <Body>{item[1]}</Body>
      <Pressable onPress={() => deleteElement(item)}>
        <DeletePressableText>X</DeletePressableText>
      </Pressable>
    </HorizontalContainer>
  )
  const keyExtractor = (item: [string, string | null]) => item[0]

  const ListEmptyComponent = () => <Body>{constants.listEmpty}</Body>

  return (
    <ScreenContainer>
      <Title>{constants.titleMainScreen}</Title>
      <Subtitle>{constants.descButtonAddElement}</Subtitle>
      <StyledTextInput
        onChangeText={setInputText}
        value={inputText}
        placeholderTextColor={constants.colors.placeholderInput}
        placeholder={constants.placeholderButtonAddElement}
        selectionColor={constants.colors.selectionInput}
      />
      <StyledPressable onPress={addElement} disabled={inputText.trim().length === 0}>
        <TextPressable>{constants.textButtonAddElemeent}</TextPressable>
      </StyledPressable>

      <List
        data={allKeysValuePairs.sort((a, b) => a[0].localeCompare(b[0]))}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={ListEmptyComponent}
      />
      <StyledPressable onPress={deleteAllElements} disabled={allKeysValuePairs.length === 0}>
        <TextPressable>{constants.textButtonDeleteALlElements}</TextPressable>
      </StyledPressable>
    </ScreenContainer>
  )
}

export default MainScreen

// CONTAINERS

const ScreenContainer = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 50px 20px;
`

const HorizontalContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`

// TEXTS

const Title = styled(Text)`
  font-size: 20px;
  color: white;
  padding: 30px 0px;
`

const Subtitle = styled(Text)`
  font-size: 18px;
  color: white;
  padding: 10px;
`

const Body = styled(Text)`
  font-size: 17px;
  color: white;
  padding: 5px 10px;
  align-items: center;
  justify-content: center;
`

const TextPressable = styled(Body)`
  color: black;
`
const DeletePressableText = styled(Body)`
  color: red;
  font-size: 20px;
`

// OTHERS

const StyledPressable = styled(Pressable)<{ disabled: boolean }>`
  display: flex;
  margin: 10px 0px;
  padding: 5px 10px;
  background-color: ${(props) => (props.disabled ? 'grey' : 'orange')};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

const StyledTextInput = styled(TextInput)`
  display: flex;
  width: 50%;
  padding: 5px 10px;
  margin: 10px;
  border: 1px solid white;
  color: white;
  border-radius: 10px;
`

const List = styled(FlatList)`
  border-radius: 10px;
  padding: 0px 10px;
  margin: 15px 10px;
` as unknown as new () => FlatList<[string, string | null]>

const Separator = styled(View)`
  border: 1px solid black;
  height: 1px;
`
