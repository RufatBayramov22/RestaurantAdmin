import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import {
  deleteMenuItem,
  getMenuCategories,
  getMenuItems,
  MenuCategory,
  MenuItem,
} from '../../../services/menuSettings';

const MenuSettings: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter items by selected category
  const items = selectedCategoryId
    ? allItems.filter(i => i.categoryId === selectedCategoryId)
    : allItems;

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch categories and menu items in parallel
      const [cats, { items: data }] = await Promise.all([
        getMenuCategories(),
        getMenuItems(1, 200),
      ]);
      setCategories(cats);
      setAllItems(data);
      if (cats.length > 0) setSelectedCategoryId(prev => prev ?? cats[0].id);
    } catch {
      setError('Failed to load menu');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
    fetchAll();
    }, [fetchAll]),
  );

  const handleAddNew = () => {
    navigation.navigate('NewMenuItem');
  };

  const handleEdit = (item: MenuItem) => {
    navigation.navigate('NewMenuItem', { menuItem: item });
  };

  const handleDelete = (item: MenuItem) => {
    Alert.alert('Delete Item', `Remove "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteMenuItem(item.id);
            setAllItems(prev => prev.filter((i: MenuItem) => i.id !== item.id));
          } catch (error: any) {
            Alert.alert('Error', error?.message || 'Failed to delete item. Please try again.');
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <View style={_styles.itemCard}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={_styles.itemImage}
          onError={() => console.log('[MenuSettings] image load error:', item.image)}
        />
      ) : (
        <View style={[_styles.itemImage, _styles.imagePlaceholder]} />
      )}

      <View style={_styles.itemContent}>
        <View>
          <Text style={_styles.itemName}>{item.name}</Text>
          <Text style={_styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        <View style={_styles.itemFooter}>
          <Text style={_styles.itemPrice}>{item.price.toFixed(2)} AZN</Text>

          <View style={_styles.itemActions}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={_styles.itemActionButton}
              onPress={() => handleEdit(item)}>
              <Image source={require('../../../assets/images/icon/edit.png')} style={_styles.itemActionIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={_styles.itemActionButton}
              onPress={() => handleDelete(item)}>
              <Image source={require('../../../assets/images/icon/delete.png')} style={_styles.itemActionIconDelete} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={_styles.container}>
      <View style={_styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={_styles.backButton}>
          <Image source={require('../../../assets/images/icon/left.png')} style={_styles.backIcon} />
        </TouchableOpacity>
        <Text style={_styles.headerTitle}>Menu Settings</Text>
        <View style={_styles.headerSpacer} />
      </View>

      {/* Category tabs — dynamic from API */}
      {loading ? (
        <View style={_styles.tabsWrapper}>
          <ActivityIndicator size="small" color="#2E78F2" style={{ marginVertical: 12 }} />
        </View>
      ) : error ? (
        <View style={_styles.centerState}>
          <Text style={_styles.emptyText}>{error}</Text>
          <TouchableOpacity style={_styles.retryButton} onPress={fetchAll}>
            <Text style={_styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={_styles.tabsWrapper}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat.id}
                activeOpacity={0.9}
                onPress={() => setSelectedCategoryId(cat.id)}
                style={[_styles.tab, selectedCategoryId === cat.id && _styles.tabActive]}>
                <Text style={[_styles.tabText, selectedCategoryId === cat.id && _styles.tabTextActive]}>
                  {cat.name}
                </Text>
                {selectedCategoryId === cat.id && <View style={_styles.tabIndicator} />}
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
              data={items}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={[
                _styles.listContent,
                items.length === 0 && { flexGrow: 1 },
              ]}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={_styles.centerState}>
                  <Text style={_styles.emptyText}>No items in this category</Text>
                </View>
              }
            />
        </>
      )}

      <View style={_styles.bottomActionWrap}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={_styles.addButton}
          onPress={handleAddNew}>
          <Text style={_styles.addButtonPlus}>+</Text>
          <Text style={_styles.addButtonText}>Add New Item</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090A0D',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 6,
    paddingBottom: 14,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 22,
    height: 22,
    tintColor: '#E8E8E8',
  },
  headerTitle: {
    color: '#EDEDED',
    fontSize: 20,
    fontWeight: '600',
  },
  headerSpacer: {
    width: 34,
  },

  tabsWrapper: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1E2026',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    position: 'relative',
  },
  tabActive: {
    backgroundColor: 'transparent',
  },
  tabText: {
    color: '#7B8494',
    fontSize: 15,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '55%',
    backgroundColor: '#2E78F2',
    borderRadius: 1,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 100,
    gap: 14,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    color: '#A9B0BD',
    fontSize: 14,
  },
  retryButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#2E78F2',
    borderRadius: 8,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  itemCard: {
    backgroundColor: '#13151A',
    borderRadius: 18,
    flexDirection: 'row',
    padding: 14,
    borderWidth: 1,
    borderColor: '#1E2026',
  },
  itemImage: {
    width: 118,
    height: 118,
    borderRadius: 12,
    backgroundColor: '#0F0F0F',
  },
  imagePlaceholder: {
    backgroundColor: '#1E2126',
  },
  itemContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#F3F3F3',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  itemDescription: {
    color: '#8A8F9E',
    fontSize: 13,
    lineHeight: 19,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  itemPrice: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '700',
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemActionButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActionIcon: {
    width: 20,
    height: 20,
    tintColor: '#C0C5D0',
  },
  itemActionIconDelete: {
    width: 20,
    height: 20,
    tintColor: '#E53935',
  },

  bottomActionWrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 10,
    backgroundColor: '#090A0D',
  },
  addButton: {
    backgroundColor: '#1A1C22',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 54,
  },
  addButtonPlus: {
    color: '#2E78F2',
    fontSize: 26,
    fontWeight: '400',
    lineHeight: 28,
    marginTop: -2,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MenuSettings;
