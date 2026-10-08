import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  acceptReservation,
  getReservations,
  rejectReservation,
  ReservationItem,
} from '../../services/reservations';
import { getProfile } from '../../services/profile';
import _styles from './styles';

type ReservationStatus = ReservationItem['status'];

const formatTime = (iso: string) => {
  if (!iso) return '--:--';
  try {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
};

const formatDate = (iso: string) => {
  if (!iso) return '--';
  try {
    return new Date(iso).toLocaleDateString([], { month: 'long', day: 'numeric' });
  } catch {
    return iso;
  }
};

const statusPillStyle = (status: ReservationStatus) => {
  switch (status) {
    case 'Approved':
      return { borderColor: '#1FB141', textColor: '#1FB141' };
    case 'Rejected':
    case 'Cancelled':
    case 'Expired':
      return { borderColor: '#FF2B2B', textColor: '#FF2B2B' };
    default:
      return { borderColor: '#F4C400', textColor: '#F4C400' };
  }
};

const actionButtonStyle = (status: ReservationStatus) => {
  if (status === 'Pending') {
    return {
      primaryText: 'Approve',
      primaryBackground: '#2E78F2',
      primaryTextColor: '#FFFFFF',
      secondaryText: 'Cancel',
      secondaryBackground: '#2B2B2B',
      secondaryTextColor: '#FFFFFF',
      disabled: false,
    };
  }
  if (status === 'Approved') {
    return {
      primaryText: 'Call',
      primaryBackground: '#27A110',
      primaryTextColor: '#FFFFFF',
      secondaryText: 'Cancel',
      secondaryBackground: '#2B2B2B',
      secondaryTextColor: '#FFFFFF',
      disabled: false,
    };
  }
  return {
    primaryText: 'Call',
    primaryBackground: '#1B4F17',
    primaryTextColor: '#6D836C',
    secondaryText: 'Cancel',
    secondaryBackground: '#222222',
    secondaryTextColor: '#666666',
    disabled: true,
  };
};

const Home: React.FC = () => {
  const styles = _styles;
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [restaurantName, setRestaurantName] = useState('Restaurant Name Here');
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<ReservationItem | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [detailsReservation, setDetailsReservation] = useState<ReservationItem | null>(null);

  const fetchRestaurantProfile = useCallback(async () => {
    try {
      const profile = await getProfile();
      if (profile?.name?.trim()) {
        setRestaurantName(profile.name.trim());
      }
    } catch {
      // keep fallback title
    }
  }, []);

  const fetchReservations = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const pageSize = 100;
      let pageNumber = 1;
      const allReservations: ReservationItem[] = [];

      while (true) {
        const page = await getReservations({
          PageNumber: pageNumber,
          PageSize: pageSize,
        });

        if (!page.length) break;
        allReservations.push(...page);

        if (page.length < pageSize) break;
        pageNumber += 1;
      }

      setReservations(allReservations);
    } catch (e) {
      console.log('[Home] fetch reservations error:', e);
      setReservations([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
    fetchRestaurantProfile();
  }, [fetchReservations, fetchRestaurantProfile]);

  const handleApprove = async (item: ReservationItem) => {
    setActionLoading(item.id);
    try {
      await acceptReservation(item.id);
      await fetchReservations(true);
    } catch (e) {
      console.log('[Home] approve reservation error:', e);
    } finally {
      setActionLoading(null);
    }
  };

  const openCancelModal = (item: ReservationItem) => {
    setSelectedReservation(item);
    setCancelModalVisible(true);
  };

  const closeCancelModal = () => {
    setCancelModalVisible(false);
    setSelectedReservation(null);
  };

  const openDetailsModal = (item: ReservationItem) => {
    setDetailsReservation(item);
    setDetailsModalVisible(true);
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setDetailsReservation(null);
  };

  const handlePrimaryAction = (item: ReservationItem) => {
    if (item.status === 'Pending') {
      handleApprove(item);
      return;
    }

    if (item.status === 'Approved') {
      openDetailsModal(item);
    }
  };

  const handleReject = async () => {
    if (!selectedReservation) {
      closeCancelModal();
      return;
    }

    setActionLoading(selectedReservation.id);
    try {
      await rejectReservation(selectedReservation.id);
      await fetchReservations(true);
    } catch (e) {
      console.log('[Home] reject reservation error:', e);
    } finally {
      setActionLoading(null);
      closeCancelModal();
    }
  };

  const filtered = reservations.filter(r =>
    r.guestName.toLowerCase().includes(search.toLowerCase()),
  );
  const detailsStatus: ReservationStatus = detailsReservation?.status ?? 'Pending';
  const detailsStatusStyle = statusPillStyle(detailsStatus);

  return (
    <SafeAreaView style={styles.home}>
      <View style={styles.headerRow}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Image style={styles.headerIcon} source={require('../../assets/images/icon/bell.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <View style={styles.searchInputWrap}>
          <Image style={styles.searchIcon} source={require('../../assets/images/icon/search.png')} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by guest name"
            placeholderTextColor="#636363"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Image style={styles.filterIcon} source={require('../../assets/images/icon/filter.png')} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color="#2E78F2" style={{ marginTop: 40 }} />
      ) : (
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => fetchReservations(true)}
              tintColor="#2E78F2"
            />
          }>
          {filtered.length === 0 ? (
            <Text style={{ color: '#636363', textAlign: 'center', marginTop: 40 }}>
              No reservations found.
            </Text>
          ) : (
            filtered.map(item => {
              const pill = statusPillStyle(item.status);
              const actions = actionButtonStyle(item.status);
              const isActioning = actionLoading === item.id;

              return (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.guestName}>{item.guestName}</Text>
                    <Text style={styles.requestTime}>{formatTime(item.requestTime)}</Text>
                  </View>

                  <View style={styles.cardMetaRow}>
                    <View style={styles.metaItem}>
                      <Image style={styles.metaIcon} source={require('../../assets/images/icon/time.png')} />
                      <Text style={styles.metaText}>{formatTime(item.reservationTime)}</Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Image style={styles.metaIcon} source={require('../../assets/images/icon/person-filled.png')} />
                      <Text style={styles.metaText}>{item.guestCount} Guest</Text>
                    </View>

                    <View style={[styles.statusPill, { borderColor: pill.borderColor }]}>
                      <Text style={[styles.statusText, { color: pill.textColor }]}>{item.status}</Text>
                    </View>
                  </View>

                  <View style={styles.buttonRow}>
                    {isActioning ? (
                      <ActivityIndicator color="#2E78F2" style={{ flex: 1 }} />
                    ) : (
                      <>
                        <TouchableOpacity
                          disabled={actions.disabled}
                          style={[styles.actionButton, { backgroundColor: actions.primaryBackground }]}
                          onPress={() => handlePrimaryAction(item)}>
                          <Text style={[styles.actionButtonText, { color: actions.primaryTextColor }]}>
                            {actions.primaryText}
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          disabled={actions.disabled}
                          style={[styles.actionButton, { backgroundColor: actions.secondaryBackground }]}
                          onPress={() => !actions.disabled ? openCancelModal(item) : undefined}>
                          <Text style={[styles.actionButtonText, { color: actions.secondaryTextColor }]}>
                            {actions.secondaryText}
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              );
            })
          )}
        </ScrollView>
      )}

      <Modal
        visible={cancelModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeCancelModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <Text style={styles.modalIconText}>!</Text>
            </View>
            <Text style={styles.modalTitle}>Cancel Reservation?</Text>
            <Text style={styles.modalDescription}>
              Are you sure you want to cancel your reservation?{`\n`}This action cannot be undone
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleReject}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={detailsModalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeDetailsModal}>
        <View style={styles.detailsOverlay}>
          <View style={styles.detailsContainer}>
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsTitle}>Reservation Details</Text>
              <TouchableOpacity style={styles.detailsCloseButton} onPress={closeDetailsModal}>
                <Text style={styles.detailsClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Username</Text>
                <Text style={styles.detailsValue}>{detailsReservation?.guestName ?? 'No Name'}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Phone number</Text>
                <Text style={styles.detailsValue}>{detailsReservation?.phoneNumber || '-'}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Email</Text>
                <Text style={styles.detailsValue}>{detailsReservation?.email || '-'}</Text>
              </View>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Date</Text>
                <Text style={styles.detailsValue}>{formatDate(detailsReservation?.reservationTime ?? '')}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Time</Text>
                <Text style={styles.detailsValue}>{formatTime(detailsReservation?.reservationTime ?? '')}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Request time</Text>
                <Text style={styles.detailsValue}>{formatTime(detailsReservation?.requestTime ?? '')}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>No. of Guests</Text>
                <Text style={styles.detailsValue}>{detailsReservation?.guestCount ?? '--'}</Text>
              </View>
              <View style={styles.detailsRow}>
                <Text style={styles.detailsLabel}>Table</Text>
                <Text style={styles.detailsValue}>{detailsReservation?.table || 'Indoor'}</Text>
              </View>
            </View>

            <View style={styles.detailsCard}>
              <Text style={styles.detailsSectionTitle}>Special requests</Text>
              <Text style={styles.detailsRequestText}>
                {detailsReservation?.specialRequests || '-'}
              </Text>
            </View>

            <View style={styles.detailsCard}>
              <View style={styles.detailsStatusRow}>
                <Text style={styles.detailsLabel}>Status</Text>
                <View style={[styles.detailsStatusPill, { borderColor: detailsStatusStyle.borderColor }]}> 
                  <Text style={[styles.detailsStatusText, { color: detailsStatusStyle.textColor }]}>{detailsStatus}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;