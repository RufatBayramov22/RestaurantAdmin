import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import styles from './styles';

type MediaItem = {
  id: string;
  uri: string;
};

const DEFAULT_MEDIA: MediaItem[] = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80' },
  { id: '2', uri: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=901&q=80' },
  { id: '3', uri: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=902&q=80' },
  { id: '4', uri: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=903&q=80' },
  { id: '5', uri: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=904&q=80' },
  { id: '6', uri: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=905&q=80' },
];

const MediaSettings: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [media, setMedia] = useState<MediaItem[]>(DEFAULT_MEDIA);

  const itemCountLabel = useMemo(() => `${media.length} items uploaded`, [media.length]);

  const handleAddMedia = async () => {
    try {
      const files = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: true,
      });

      const mapped = files
        .filter(file => !!file.uri)
        .map((file, idx) => ({
          id: `${Date.now()}-${idx}`,
          uri: file.uri,
        }));

      if (mapped.length) {
        setMedia(prev => [...mapped, ...prev]);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        console.log('[MediaSettings] pick media error:', error);
      }
    }
  };

  const handleDelete = (id: string) => {
    setMedia(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: MediaItem }) => (
    <View style={styles.mediaCard}>
      <Image source={{ uri: item.uri }} style={styles.mediaImage} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteButtonText}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Media</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Upload new media</Text>

        <TouchableOpacity style={styles.addMediaButton} onPress={handleAddMedia} activeOpacity={0.85}>
          <Text style={styles.addMediaPlus}>＋</Text>
          <Text style={styles.addMediaText}>Add media</Text>
        </TouchableOpacity>

        <Text style={styles.countText}>{itemCountLabel}</Text>

        <FlatList
          data={media}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.mediaGridRow}
          contentContainerStyle={styles.mediaGridContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default MediaSettings;
