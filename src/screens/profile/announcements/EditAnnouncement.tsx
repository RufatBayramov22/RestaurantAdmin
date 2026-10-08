import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack';
import DocumentPicker from 'react-native-document-picker';
import { AnnouncementItem, deleteAnnouncement } from '../../../services/announcements';

type EditAnnouncementScreenProps = {
  announcement?: AnnouncementItem;
};

const EditAnnouncement: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const params = route.params as EditAnnouncementScreenProps | undefined;
  const announcement = params?.announcement;

  const [title, setTitle] = useState(announcement?.title || '');
  const [description, setDescription] = useState(announcement?.description || '');
  const [image, setImage] = useState(announcement?.image || '');
  const [date, setDate] = useState(announcement?.date || '');
  const [time, setTime] = useState(announcement?.time || '');
  const [notificationEnabled, setNotificationEnabled] = useState(announcement?.notificationSent ?? false);
  const [loading, setLoading] = useState(false);

  const handleChangeImage = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      const pickedFile = Array.isArray(result) ? result[0] : result;
      if (pickedFile && 'uri' in pickedFile) {
        setImage(pickedFile.uri);
      }
    } catch (error) {
      if (!DocumentPicker.isCancel(error)) {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  const handleRemoveImage = () => {
    setImage('');
  };

  const handleSaveChanges = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    if (!image.trim()) {
      Alert.alert('Error', 'Please select an image');
      return;
    }
    if (!date.trim()) {
      Alert.alert('Error', 'Please select a date');
      return;
    }
    if (!time.trim()) {
      Alert.alert('Error', 'Please select a time');
      return;
    }

    setLoading(true);
    try {
      // TODO: Call API to save announcement
      // await updateAnnouncement({ id, title, description, image, date, time, notificationEnabled })
      Alert.alert('Success', 'Announcement updated successfully');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error?.message || 'Failed to save announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Announcement',
      'Are you sure you want to delete this announcement? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              if (announcement?.id) {
                await deleteAnnouncement(announcement.id);
                Alert.alert('Success', 'Announcement deleted successfully');
                navigation.goBack();
              }
            } catch (error: any) {
              Alert.alert('Error', error?.message || 'Failed to delete announcement');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../../../assets/images/icon/left.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Announcement</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!loading}>
        {/* Title Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter announcement title"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
            editable={!loading}
            maxLength={100}
          />
        </View>

        {/* Description Input */}
        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Write a short description of announcement..."
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            editable={!loading}
            multiline
            maxLength={500}
          />
        </View>

        {/* Thumbnail Image */}
        <View style={styles.section}>
          <Text style={styles.label}>Thumbnail Image</Text>
          <View style={styles.imageCard}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imageEmpty}>
                <Text style={styles.imageEmptyText}>No image selected</Text>
              </View>
            )}
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={handleChangeImage}
                disabled={loading}>
                <Image source={require('../../../assets/images/icon/upload.png')} style={styles.imageButtonIcon} />
                <Text style={styles.imageButtonText}>Change</Text>
              </TouchableOpacity>
              {image && (
                <TouchableOpacity
                  style={styles.imageButtonDanger}
                  onPress={handleRemoveImage}
                  disabled={loading}>
                  <Text style={styles.imageButtonDangerIcon}>🗑</Text>
                  <Text style={styles.imageButtonDangerText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Date and Time */}
        <View style={styles.dateTimeRow}>
          <View style={[styles.section, styles.dateTimeSection]}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity style={styles.dateTimeInput}>
              <Text style={date ? styles.dateTimeInputText : styles.dateTimeInputPlaceholder}>
                {date || 'Select date'}
              </Text>
              <Image source={require('../../../assets/images/icon/time.png')} style={styles.dateTimeIcon} />
            </TouchableOpacity>
          </View>

          <View style={[styles.section, styles.dateTimeSection]}>
            <Text style={styles.label}>Time</Text>
            <TouchableOpacity style={styles.dateTimeInput}>
              <Text style={time ? styles.dateTimeInputText : styles.dateTimeInputPlaceholder}>
                {time || 'Set time'}
              </Text>
              <Image source={require('../../../assets/images/icon/time.png')} style={styles.dateTimeIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Toggle */}
        <View style={styles.section}>
          <View style={styles.notificationToggleRow}>
            <Text style={styles.notificationToggleText}>Send notification to users interested in this category</Text>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              disabled={loading}
              trackColor={{ false: '#3e3e3e', true: '#2E78F2' }}
              thumbColor={notificationEnabled ? '#FFFFFF' : '#CCCCCC'}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSaveChanges}
          disabled={loading}
          activeOpacity={0.85}>
          <Text style={styles.saveButtonText}>{loading ? 'Saving...' : 'Save Changes'}</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          disabled={loading}
          activeOpacity={0.85}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </ScrollView>
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

  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 20,
  },
  section: {
    gap: 10,
  },
  label: {
    color: '#EDEDED',
    fontSize: 16,
    fontWeight: '600',
  },

  titleInput: {
    backgroundColor: '#1A1C20',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2A2D33',
  },
  descriptionInput: {
    backgroundColor: '#1A1C20',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 14,
    height: 160,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#2A2D33',
  },

  imageCard: {
    backgroundColor: '#1A1C20',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A2D33',
  },
  imagePreview: {
    width: '100%',
    height: 180,
    backgroundColor: '#0F0F0F',
  },
  imageEmpty: {
    width: '100%',
    height: 180,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageEmptyText: {
    color: '#666666',
    fontSize: 14,
  },
  imageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#1A1C20',
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2A2D33',
    borderRadius: 10,
    paddingVertical: 10,
  },
  imageButtonIcon: {
    width: 20,
    height: 20,
    tintColor: '#2E78F2',
  },
  imageButtonText: {
    color: '#2E78F2',
    fontSize: 14,
    fontWeight: '600',
  },
  imageButtonDanger: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF3232',
    borderRadius: 10,
    paddingVertical: 10,
    opacity: 0.1,
  },
  imageButtonDangerIcon: {
    fontSize: 18,
  },
  imageButtonDangerText: {
    color: '#FF3232',
    fontSize: 14,
    fontWeight: '600',
  },

  dateTimeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateTimeSection: {
    flex: 1,
  },
  dateTimeInput: {
    backgroundColor: '#1A1C20',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#2A2D33',
  },
  dateTimeInputText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  dateTimeInputPlaceholder: {
    color: '#666',
    fontSize: 14,
  },
  dateTimeIcon: {
    width: 20,
    height: 20,
    tintColor: '#2E78F2',
  },

  notificationToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A1C20',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#2A2D33',
  },
  notificationToggleText: {
    flex: 1,
    color: '#EDEDED',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 12,
  },

  saveButton: {
    backgroundColor: '#2E78F2',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  deleteButton: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#2E78F2',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditAnnouncement;
