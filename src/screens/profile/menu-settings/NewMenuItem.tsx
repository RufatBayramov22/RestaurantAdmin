import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DocumentPicker from 'react-native-document-picker';
import { RootStackParamList } from '../../../navigation/stack';
import {
  createMenuItem,
  getMenuCategories,
  MenuCategory,
  MenuItem,
  updateMenuItem,
} from '../../../services/menuSettings';

const NewMenuItem: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const params = route.params as { menuItem?: MenuItem } | undefined;
  const editingItem = params?.menuItem;
  const isEditMode = !!editingItem;

  const [itemName, setItemName] = useState(editingItem?.name ?? '');
  const [ingredients, setIngredients] = useState(editingItem?.description ?? '');
  const [price, setPrice] = useState(editingItem ? String(editingItem.price) : '');
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [imageFile, setImageFile] = useState<{ uri: string; name?: string; type?: string } | null>(null);
  const [imageUri, setImageUri] = useState(editingItem?.image ?? '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getMenuCategories();
        setCategories(data);
        if (data.length > 0) {
          if (editingItem?.categoryId) {
            const matched = data.find(category => category.id === editingItem.categoryId);
            setSelectedCategory(matched ?? data[0]);
          } else {
            setSelectedCategory(data[0]);
          }
        }
      } catch {
        Alert.alert('Error', 'Failed to load categories');
      }
    };

    loadCategories();
  }, []);

  const handlePickImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const picked = Array.isArray(result) ? result[0] : result;
      if (!picked?.uri) return;
      setImageFile({
        uri: picked.uri,
        name: picked.name ?? 'menu-image.jpg',
        type: picked.type ?? 'image/jpeg',
      });
      setImageUri(picked.uri);
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  const handleSave = async () => {
    if (!itemName.trim()) {
      Alert.alert('Validation', 'Please enter item name');
      return;
    }

    if (!selectedCategory?.id) {
      Alert.alert('Validation', 'Please select category');
      return;
    }

    const parsedPrice = Number(price.replace(',', '.'));
    if (!price.trim() || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Validation', 'Please enter valid price');
      return;
    }

    if (!isEditMode && !imageFile) {
      Alert.alert('Validation', 'Please upload item image');
      return;
    }

    setSaving(true);
    try {
      if (isEditMode && editingItem?.id) {
        await updateMenuItem(editingItem.id, {
          name: itemName.trim(),
          description: ingredients.trim(),
          price: parsedPrice,
          categoryId: selectedCategory.id,
          imageFile: imageFile ?? undefined,
        });
        Alert.alert('Success', 'Menu item updated successfully');
      } else {
        await createMenuItem({
          name: itemName.trim(),
          description: ingredients.trim(),
          price: parsedPrice,
          categoryId: selectedCategory.id,
          imageFile: imageFile ?? undefined,
        });
        Alert.alert('Success', 'Menu item created successfully');
      }

      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error?.message || (isEditMode ? 'Failed to update menu item' : 'Failed to create menu item'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditMode ? 'Edit Item' : 'New Item'}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            value={itemName}
            onChangeText={setItemName}
            style={styles.input}
            placeholder="e.g., Grilled Chicken"
            placeholderTextColor="#6F737C"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Ingredients</Text>
          <TextInput
            value={ingredients}
            onChangeText={setIngredients}
            style={[styles.input, styles.textArea]}
            placeholder="Add ingredients.."
            placeholderTextColor="#6F737C"
            multiline
            textAlignVertical="top"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setCategoryOpen(prev => !prev)}
            style={styles.selectInput}>
            <Text style={[styles.selectText, !selectedCategory && styles.selectPlaceholder]}>
              {selectedCategory?.name || 'Select category'}
            </Text>
            <Image source={require('../../../assets/images/icon/down-arrow.png')} style={styles.selectArrow} />
          </TouchableOpacity>

          {categoryOpen && (
            <View style={styles.dropdown}>
              {categories.map(category => {
                const selected = selectedCategory?.id === category.id;
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[styles.dropdownItem, selected && styles.dropdownItemActive]}
                    onPress={() => {
                      setSelectedCategory(category);
                      setCategoryOpen(false);
                    }}>
                    <Text style={[styles.dropdownText, selected && styles.dropdownTextActive]}>{category.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Price (AZN)</Text>
          <TextInput
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            placeholder="e.g., 12.50"
            placeholderTextColor="#6F737C"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Item Image</Text>
          <TouchableOpacity onPress={handlePickImage} activeOpacity={0.85} style={styles.uploadBox}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <>
                <Image source={require('../../../assets/images/icon/upload.png')} style={styles.uploadIcon} />
                <Text style={styles.uploadText}>Tap to upload image</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomWrap}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          disabled={saving}
          onPress={handleSave}>
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>{isEditMode ? 'Update Item' : 'Save Item'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    paddingBottom: 10,
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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 120,
    gap: 14,
  },
  fieldWrap: {
    gap: 8,
  },
  label: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2D33',
    backgroundColor: '#1A1C20',
    paddingHorizontal: 14,
    color: '#FFFFFF',
    fontSize: 16,
  },
  textArea: {
    height: 150,
    paddingTop: 14,
  },
  selectInput: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2D33',
    backgroundColor: '#1A1C20',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectPlaceholder: {
    color: '#6F737C',
  },
  selectArrow: {
    width: 16,
    height: 16,
    tintColor: '#AAB0BC',
  },
  dropdown: {
    backgroundColor: '#14161B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2A2D33',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  dropdownItemActive: {
    backgroundColor: '#1D2E4A',
  },
  dropdownText: {
    color: '#D7DBE3',
    fontSize: 15,
  },
  dropdownTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  uploadBox: {
    height: 136,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#2A2D33',
    backgroundColor: '#1A1C20',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  uploadIcon: {
    width: 28,
    height: 28,
    tintColor: '#AAB0BC',
    marginBottom: 8,
  },
  uploadText: {
    color: '#AAB0BC',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  bottomWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: '#090A0D',
  },
  saveButton: {
    height: 54,
    borderRadius: 28,
    backgroundColor: '#2E78F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default NewMenuItem;
