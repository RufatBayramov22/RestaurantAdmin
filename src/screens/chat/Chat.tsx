import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../navigation/stack';
import { getRecentRestaurants, getRecentUsers, RecentChatUser } from '../../services/messages';

import _styles from './styles';

type ChatItem = {
  id: string;
  partnerUserId?: number;
  partnerRestaurantId?: number;
  guestName: string;
  lastMessage: string;
  timeLabel: string;
  unread: boolean;
  avatarUrl?: string;
  avatarSource: ImageSourcePropType;
};

const fallbackAvatar = require('../../assets/images/icon/avatar.png');

const formatTimeLabel = (value?: string) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Today';

  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  if (isToday) return 'Today';
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const mapRecentToChatItem = (u: RecentChatUser, index: number): ChatItem => ({
  id: String(u.partnerUserId ?? u.partnerRestaurantId ?? `chat-${index}`),
  partnerUserId: u.partnerUserId,
  partnerRestaurantId: u.partnerRestaurantId,
  guestName: u.guestName,
  lastMessage: u.lastMessage || 'No messages yet',
  timeLabel: formatTimeLabel(u.lastMessageTime),
  unread: (u.unreadCount ?? 0) > 0,
  avatarUrl: u.avatarUrl,
  avatarSource: u.avatarUrl ? { uri: u.avatarUrl } : fallbackAvatar,
});

const Chat: React.FC = () => {
  const styles = _styles;
  const navigation = useNavigation<NavigationProps>();
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [chatItems, setChatItems] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const loadChats = useCallback(async () => {
    setLoading(true);
    try {
      const pageSize = 50;
      let pageNumber = 1;
      const allUsers: RecentChatUser[] = [];
      let hadUsersError = false;
      let hadRestaurantsError = false;

      while (true) {
        const [usersResult, restaurantsResult] = await Promise.allSettled([
          getRecentUsers({
            PageNumber: pageNumber,
            PageSize: pageSize,
          }),
          getRecentRestaurants({
            PageNumber: pageNumber,
            PageSize: pageSize,
          }),
        ]);

        const users = usersResult.status === 'fulfilled' ? usersResult.value : [];
        const restaurants = restaurantsResult.status === 'fulfilled' ? restaurantsResult.value : [];

        if (usersResult.status === 'rejected' && !hadUsersError) {
          hadUsersError = true;
          console.log('[Chat] recent-users request failed:', usersResult.reason);
        }
        if (restaurantsResult.status === 'rejected' && !hadRestaurantsError) {
          hadRestaurantsError = true;
          console.log('[Chat] recent-restaurants request failed:', restaurantsResult.reason);
        }

        const page = [...users, ...restaurants];

        const filteredPage = debouncedSearch
          ? page.filter(p => p.guestName.toLowerCase().includes(debouncedSearch.toLowerCase()))
          : page;

        if (!filteredPage.length) {
          if (!users.length && !restaurants.length) break;
          pageNumber += 1;
          continue;
        }

        allUsers.push(...filteredPage);

        const usersReachedEnd = users.length < pageSize;
        const restaurantsReachedEnd = restaurants.length < pageSize;
        if (usersReachedEnd && restaurantsReachedEnd) break;
        pageNumber += 1;
      }

      const uniqueMap = new Map<string, RecentChatUser>();
      allUsers.forEach((item, idx) => {
        const key = String(item.partnerUserId ?? item.partnerRestaurantId ?? `${item.guestName}-${idx}`);
        if (!uniqueMap.has(key)) uniqueMap.set(key, item);
      });

      setChatItems(Array.from(uniqueMap.values()).map(mapRecentToChatItem));
    } catch (error) {
      console.log('[Chat] load chats error:', error);
      setChatItems([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const filtered = useMemo(
    () => chatItems.filter(i => i.guestName.toLowerCase().includes(search.toLowerCase())),
    [chatItems, search],
  );

  const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.chatRow}
      onPress={() =>
        navigation.navigate('ChatDetail', {
          guestName: item.guestName,
          partnerUserId: item.partnerUserId,
          partnerRestaurantId: item.partnerRestaurantId,
          avatarUrl: item.avatarUrl,
        })
      }
    >
      <View style={styles.leftWrap}>
        {item.unread ? <View style={styles.unreadDot} /> : <View style={styles.unreadDotPlaceholder} />}
        <Image source={item.avatarSource} style={styles.avatar} />
      </View>

      <View style={styles.centerWrap}>
        <Text style={styles.nameText}>{item.guestName}</Text>
        <Text style={styles.messageText}>{item.lastMessage}</Text>
      </View>

      <Text style={styles.timeText}>{item.timeLabel}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chats</Text>

      <View style={styles.searchWrap}>
        <Image style={styles.searchIcon} source={require('../../assets/images/icon/search.png')} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholder="Search by guest name"
          placeholderTextColor="#4E4E4E"
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color="#2E78F2" style={{ marginTop: 40 }} />
          ) : (
            <Text style={{ color: '#8A8D94', textAlign: 'center', marginTop: 40 }}>Chat is not found</Text>
          )
        }
        onRefresh={loadChats}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Chat;
