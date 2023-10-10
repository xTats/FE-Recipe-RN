/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getRecipeId,
  getRecipeIdSelector,
} from '../../redux/reducer/recipe/getRecipeIdSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createLiked} from '../../redux/reducer/liked/createLikedSlice';
import {createSaved} from '../../redux/reducer/saved/createSavedSlice';
import {createComment} from '../../redux/reducer/comment/createCommentSlice';
import {
  getCommentRecipeId,
  getCommentRecipeIdSelector,
} from '../../redux/reducer/comment/getCommentRecipeIdSlice';
import {TextArea} from 'native-base';

export default function Comment() {
  const route = useRoute();
  const {recipes_id} = route.params;
  const dispatch = useDispatch();
  const recipe = useSelector(getRecipeIdSelector);
  const comment = useSelector(getCommentRecipeIdSelector);
  console.log(comment);
  const [loading, setLoading] = useState(false);
  const [commen, setCommen] = useState('');

  console.log(commen);
  // console.log(users);

  const handleLike = async () => {
    try {
      const users_id = await AsyncStorage.getItem('users_id');
      dispatch(createLiked({users_id, recipes_id}));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaved = async () => {
    try {
      const users_id = await AsyncStorage.getItem('users_id');
      dispatch(createSaved({users_id, recipes_id}));
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    try {
      const users_id = await AsyncStorage.getItem('users_id');
      await dispatch(createComment({commen, users_id, recipes_id}));

      dispatch(getCommentRecipeId(recipes_id));

      setCommen('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(getRecipeId(recipes_id));
    setLoading(false);
  }, [dispatch, recipes_id]);

  useEffect(() => {
    dispatch(getCommentRecipeId(recipes_id));
    setLoading(false);
  }, [dispatch, recipes_id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        recipe?.data?.map((item, i) => (
          <View style={styles.top} key={i}>
            <Image
              source={{uri: item.image}}
              style={{
                width: '100%',
                height: 300,
                position: 'relative',
                objectFit: 'fill',
              }}
              resizeMode="contain"
            />
            <Ionicons
              name="arrow-back"
              style={{
                fontSize: 24,
                color: '#F5F5F5',
                position: 'absolute',
                left: 10,
                top: 10,
              }}
            />
            <View style={styles.textInside}>
              <View styles={styles.textLeft}>
                <Text style={styles.textDesc}>{item.name_recipes}</Text>
                <Text style={styles.textBy}>{item.creator}</Text>
              </View>
              <View style={styles.iconRight}>
                <TouchableOpacity style={styles.icon1} onPress={handleSaved}>
                  <Ionicons
                    style={{fontSize: 36, color: '#E9E9E8'}}
                    name="bookmark-outline"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon2} onPress={handleLike}>
                  <AntDesign
                    style={{fontSize: 36, color: '#EFC81A'}}
                    name="like2"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          width: '100%',
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textAreaContainer}>
            <KeyboardAvoidingView
              style={{flex: 1}}
              keyboardVerticalOffset={{height: 50}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <TextArea
                value={commen}
                onChangeText={setCommen}
                shadow={2}
                h="100%"
                placeholder="commen"
                w="100%"
                _light={{
                  placeholderTextColor: 'trueGray.700',
                  bg: 'coolGray.100',
                  _hover: {
                    bg: 'coolGray.200',
                  },
                  _focus: {
                    bg: 'coolGray.200:alpha.70',
                  },
                }}
                _dark={{
                  bg: 'coolGray.800',
                  _hover: {
                    bg: 'coolGray.900',
                  },
                  _focus: {
                    bg: 'coolGray.900:alpha.70',
                  },
                }}
              />
            </KeyboardAvoidingView>
          </View>
          <View style={{paddingTop: 15, width: '100%'}}>
            <Button
              title="Post Comment"
              onPress={handleComment}
              color="#EFC81A"
            />
          </View>
          <View style={{paddingTop: 15}}>
            <Text style={{color: '#666', fontSize: 12}}> Comment :</Text>
          </View>
          <View>
            {loading ? (
              <Text>Loading....</Text>
            ) : (
              comment?.data?.map((item, index) => (
                <View
                  style={{
                    paddingVertical: 10,
                    flexDirection: 'row',
                    paddingLeft: 10,
                  }}
                  key={index}>
                  <View
                    style={{
                      paddingVertical: 10,
                      flexDirection: 'row',
                      backgroundColor: '#e1eded',
                      borderRadius: 15,
                      paddingLeft: 10,
                    }}>
                    <Image
                      source={{
                        uri: item.imageprofile,
                      }}
                      style={{width: 32, height: 32, borderRadius: 32}}
                    />
                    <View
                      style={{
                        paddingLeft: 10,
                        width: 280,
                        borderRadius: 10,
                      }}>
                      <Text style={{color: '#151a1a'}}>{item.creator}</Text>
                      <Text style={{color: '#596e6e'}}>{item.commen}</Text>
                    </View>
                    <Text style={{color: '#596e6e'}}>icon</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  top: {
    width: '100%',
    height: '40%',
    position: 'relative',
    borderRadius: 10,
  },
  textInside: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  textDesc: {
    width: 149,
    color: 'white',
    fontSize: 32,
  },
  textBy: {
    color: 'brown',
    fontSize: 12,
  },
  textLeft: {
    width: 149,
  },
  iconRight: {
    flexDirection: 'row',
  },
  icon1: {
    width: 50,
    height: 50,
    marginRight: 10,
    backgroundColor: '#EFC81A',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon2: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    marginTop: 15,
    backgroundColor: '#FAF7ED',
    width: '100%',
    height: 150,
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    width: 319,
  },
  scrollViewContent: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16, // Menambahkan padding horizontal untuk konten agar rata tengah
  },
});
