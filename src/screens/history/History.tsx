import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import _styles from './styles';
import { getReservations, ReservationItem } from '../../services/reservations';

type HistoryStatus = 'Completed' | 'Canceled';

type HistoryItem = {
    id: string;
    guestName: string;
    requestTime: string;
    reservationTime: string;
    guests: number;
    status: HistoryStatus;
};

const formatTime = (value: string) => {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

const toHistoryStatus = (status: ReservationItem['status']): HistoryStatus | null => {
    if (status === 'Approved') return 'Completed';
    if (status === 'Rejected' || status === 'Cancelled' || status === 'Expired') return 'Canceled';
    return null;
};

const mapReservationToHistoryItem = (item: ReservationItem): HistoryItem | null => {
    const mappedStatus = toHistoryStatus(item.status);
    if (!mappedStatus) return null;

    return {
        id: String(item.id),
        guestName: item.guestName,
        requestTime: formatTime(item.requestTime),
        reservationTime: formatTime(item.reservationTime),
        guests: item.guestCount,
        status: mappedStatus,
    };
};

const statusStyle = (status: HistoryStatus) => {
    if (status === 'Canceled') {
        return {
            borderColor: '#FF2B2B',
            textColor: '#FF2B2B',
        };
    }

    return {
        borderColor: '#1FB141',
        textColor: '#1FB141',
    };
};

const History: React.FC = () => {
    const styles = _styles;
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    const loadHistory = useCallback(async () => {
        setLoading(true);
        try {
            const pageSize = 100;
            let pageNumber = 1;
            const allReservations: ReservationItem[] = [];

            while (true) {
                const page = await getReservations({
                    PageNumber: pageNumber,
                    PageSize: pageSize,
                    UserName: debouncedSearch || undefined,
                    Username: debouncedSearch || undefined,
                    GuestName: debouncedSearch || undefined,
                    Search: debouncedSearch || undefined,
                    SearchText: debouncedSearch || undefined,
                });
                if (!page.length) break;

                allReservations.push(...page);
                if (page.length < pageSize) break;
                pageNumber += 1;
            }

            const mapped = allReservations
                .map(mapReservationToHistoryItem)
                .filter((v): v is HistoryItem => Boolean(v));
            setHistoryItems(mapped);
        } catch (error) {
            console.log('[History] load history error:', error);
            setHistoryItems([]);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        loadHistory();
    }, [loadHistory]);

    const filteredItems = useMemo(() => {
        if (!debouncedSearch) return historyItems;
        return historyItems.filter(i => i.guestName.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }, [historyItems, debouncedSearch]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchRow}>
                <View style={styles.searchInputWrap}>
                    <Image style={styles.searchIcon} source={require('../../assets/images/icon/search.png')} />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchInput}
                        placeholder="Search by guest name"
                        placeholderTextColor="#636363"
                    />
                </View>

                <TouchableOpacity style={styles.filterButton}>
                    <Image style={styles.filterIcon} source={require('../../assets/images/icon/filter.png')} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.list}
                contentContainerStyle={styles.listContent}
                refreshControl={undefined}
            >
                {loading ? (
                    <ActivityIndicator color="#2E78F2" style={{ marginTop: 40 }} />
                ) : null}

                {!loading && filteredItems.length === 0 ? (
                    <Text style={{ color: '#8A8D94', textAlign: 'center', marginTop: 40 , flex:1, justifyContent:'center', alignItems: 'center' }}>Don't have Reservations</Text>
                ) : null}

                {filteredItems.map(item => {
                    const pill = statusStyle(item.status);

                    return (
                        <View key={item.id} style={styles.card}>
                            <View style={styles.cardTopRow}>
                                <Text style={styles.guestName}>{item.guestName}</Text>
                                <Text style={styles.requestTime}>{item.requestTime}</Text>
                            </View>

                            <View style={styles.cardMetaRow}>
                                <View style={styles.metaItem}>
                                    <Image style={styles.metaIcon} source={require('../../assets/images/icon/time.png')} />
                                    <Text style={styles.metaText}>{item.reservationTime}</Text>
                                </View>

                                <View style={styles.metaItem}>
                                    <Image style={styles.metaIcon} source={require('../../assets/images/icon/person.png')} />
                                    <Text style={styles.metaText}>{item.guests} Guest</Text>
                                </View>

                                <View style={[styles.statusPill, { borderColor: pill.borderColor }]}>
                                    <Text style={[styles.statusText, { color: pill.textColor }]}>{item.status}</Text>
                                </View>
                            </View>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    disabled
                                    style={[styles.actionButton, styles.callButtonDisabled]}>
                                    <Text style={[styles.actionButtonText, styles.callTextDisabled]}>Call</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    disabled
                                    style={[styles.actionButton, styles.cancelButtonDisabled]}>
                                    <Text style={[styles.actionButtonText, styles.cancelTextDisabled]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default History;
