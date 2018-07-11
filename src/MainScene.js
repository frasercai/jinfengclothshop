/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

//import liraries
import React, { Component } from 'react';
import { StatusBar, Text, Button, View, DeviceEventEmitter} from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import color from './widget/color'
//import { screen, system, tool } from './common'
import TabBarItem from './widget/TabBarItem'

import GoodsListScene from './scene/goods/GoodsListScene'
import GoodsDetailScene from './scene/goods/GoodsDetailScene'
import HomeScene from './scene/home/HomeScene'
import OrderScene from './scene/order/OrderScene'
import OrderDetailView from './scene/order/OrderDetailView'
import ShopCarScene from './scene/car/ShopCarScene'
import NearbyScene from './scene/nearby/NearbyScene'
import MineScene from './scene/mine/MineScene'
import MineTest from './scene/mine/MineTest'
import LoginScene from './scene/login/LoginScene'
import SettingsScene from './scene/setting/SettingsScene'


//import WebScene from './widget/WebScene'
//import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene'

const lightContentScenes = []
// const lightContentScenes = ['Home', 'Mine']

function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }

    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

// create a component
class RootScene extends Component {
    constructor() {
        super()

        StatusBar.setBarStyle('dark-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={(prevState, currentState) => {
                        const currentScreen = getCurrentRouteName(currentState);
                        const prevScreen = getCurrentRouteName(prevState);
                        // alert(" prevState: " + JSON.stringify(prevState))
                        // alert(" currentState: " + JSON.stringify(currentState))
                        // alert(" currentScreen: " + currentScreen)
                        // alert(" prevScreen: " + prevScreen)
                    DeviceEventEmitter.emit("onTabShow", currentScreen)
                    DeviceEventEmitter.emit("onTabHidden", prevScreen)
                }}

            />
        );
    }

    static notifyNavigationChange(prevScreen, currentScreen) {

    }
}

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene ,
            navigationOptions: ({ navigation }) => ({
                title:"首页",
                tabBarLabel: '首页',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_homepage.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected.png')}
                    />
                )
            }),
        },

        // Nearby: {
        //     screen: NearbyScene,
        //     navigationOptions: ({ navigation }) => ({
        //         title:"附近",
        //         tabBarLabel: '附近',
        //         tabBarIcon: ({ focused, tintColor }) => (
        //             <TabBarItem
        //                 tintColor={tintColor}
        //                 focused={focused}
        //                 normalImage={require('./img/tabbar/pfb_tabbar_merchant@2x.png')}
        //                 selectedImage={require('./img/tabbar/pfb_tabbar_merchant_selected@2x.png')}
        //             />
        //         )
        //     }),
        // },

        Cart: {
            screen: ShopCarScene,
            navigationOptions: ({ navigation }) => ({
                title:"购物车",
                tabBarLabel: '购物车',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_order.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_order_selected.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineTest,
            navigationOptions: ({ navigation }) => ({
                //顶部页面的标题
                title:"我的",
                //底部标签页按钮的title
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_mine.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected.png')}
                    />
                ),
            }),
         }


    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#979797',
            style: { backgroundColor: '#ffffff'},
        },
    }

);

const Navigator = StackNavigator(
    {
        Tab: {
            screen: Tab,
            navigationOptions: {
            }
         },

         GoodsList: {
            screen: GoodsListScene,
         },

         GoodsDetail: {
            screen: GoodsDetailScene,
             navigationOptions: {
                 title:"商品详情"
             }
         },

         Login: {
              screen: LoginScene,
              navigationOptions: {
                title:"登录",
              }
         },
         Order: {
            screen: OrderScene,
            navigationOptions: {
                title:"我的订单"
            }
         },
         OrderDetail :{
             screen: OrderDetailView,
             navigationOptions: {
                 title:"订单详情"
             }
         },
         Settings: {
             screen: SettingsScene,
             navigationOptions: {
                 title:"设置"
             }
         }

    },
    {
        navigationOptions: {
            headerStyle: { backgroundColor: color.white},
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        }
    }
);
//make this component available to the app
export default RootScene;
