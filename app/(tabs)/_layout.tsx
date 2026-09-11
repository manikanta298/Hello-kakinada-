import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

export default function TabsLayout() {
  return (<Tabs screenOptions={{ headerShown:false, tabBarActiveTintColor:colors.accent, tabBarInactiveTintColor:colors.textTertiary, tabBarStyle:{backgroundColor:colors.background,borderTopColor:colors.border} }}><Tabs.Screen name="index" options={{title:'Home',tabBarIcon:({color,size})=><Ionicons name="home-outline" color={color} size={size}/>}}/></Tabs>);
}
