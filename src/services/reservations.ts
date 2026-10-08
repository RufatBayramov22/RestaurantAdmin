import { apiRequest } from './apiRequest';
import { getProfile } from './profile';

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled' | 'Expired';

export type ReservationItem = {
  id: number;
  guestName: string;
  requestTime: string;
  reservationTime: string;
  guestCount: number;
  status: ApprovalStatus;
  phoneNumber?: string;
  email?: string;
  table?: string;
  specialRequests?: string;
};

export type VerifiedReservationDetails = {
  guestName: string;
  phoneNumber: string;
  email: string;
  date: string;
  time: string;
  guestCount: number;
  table: string;
  specialRequests: string;
  status: string;
};

export type GetReservationsParams = {
  ApprovalStatus?: ApprovalStatus;
  PageNumber?: number;
  PageSize?: number;
  UserName?: string;
  Username?: string;
  GuestName?: string;
  Search?: string;
  SearchText?: string;
};

const firstNonEmptyString = (...values: any[]): string => {
  for (const v of values) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
};

const firstPositiveNumber = (...values: any[]): number => {
  for (const v of values) {
    const n = Number(v);
    if (!Number.isNaN(n) && n > 0) return n;
  }
  return 0;
};

const normalizeKey = (k: string) => k.replace(/[^a-z0-9]/gi, '').toLowerCase();

const deepCollect = (value: any, keySet: Set<string>, out: any[] = []): any[] => {
  if (!value || typeof value !== 'object') return out;
  if (Array.isArray(value)) {
    value.forEach(v => deepCollect(v, keySet, out));
    return out;
  }

  Object.entries(value).forEach(([k, v]) => {
    if (keySet.has(normalizeKey(k))) {
      out.push(v);
    }
    deepCollect(v, keySet, out);
  });

  return out;
};

const deepFirstString = (source: any, keys: string[]): string => {
  const keySet = new Set(keys.map(normalizeKey));
  const values = deepCollect(source, keySet);
  return firstNonEmptyString(...values);
};

const deepFirstPositiveNumber = (source: any, keys: string[]): number => {
  const keySet = new Set(keys.map(normalizeKey));
  const values = deepCollect(source, keySet);
  return firstPositiveNumber(...values);
};

const extractList = (raw: any): any[] => {
  if (Array.isArray(raw)) return raw;
  if (!raw || typeof raw !== 'object') return [];

  return (
    raw.Items ??
    raw.items ??
    raw.Data ??
    raw.data ??
    raw.Results ??
    raw.results ??
    raw.List ??
    raw.list ??
    []
  );
};

const mapReservationItem = (r: any): ReservationItem => {
  const reservation = r?.reservation ?? r?.Reservation ?? {};
  const guest = r?.guest ?? r?.Guest ?? r?.user ?? r?.User ?? {};
  const user = r?.applicationUser ?? r?.ApplicationUser ?? r?.appUser ?? r?.AppUser ?? {};

  return {
    id: firstPositiveNumber(
      r?.id,
      r?.Id,
      r?.reservationID,
      r?.ReservationID,
      r?.reservationId,
      r?.ReservationId,
      reservation?.id,
      reservation?.Id,
    ),
    guestName: firstNonEmptyString(
      r?.guestName,
      r?.GuestName,
      r?.userName,
      r?.UserName,
      r?.user?.name,
      r?.user?.Name,
      r?.user?.fullName,
      r?.user?.FullName,
      r?.fullName,
      r?.FullName,
      `${r?.userName ?? ''} ${r?.userSurname ?? ''}`.trim(),
      `${r?.UserName ?? ''} ${r?.UserSurname ?? ''}`.trim(),
      guest?.fullName,
      guest?.FullName,
      guest?.name,
      guest?.Name,
      `${guest?.name ?? ''} ${guest?.surname ?? ''}`.trim(),
      `${guest?.Name ?? ''} ${guest?.Surname ?? ''}`.trim(),
      guest?.userName,
      guest?.UserName,
      `${user?.name ?? ''} ${user?.surname ?? ''}`.trim(),
      `${user?.Name ?? ''} ${user?.Surname ?? ''}`.trim(),
      user?.fullName,
      user?.FullName,
      reservation?.guestName,
      reservation?.GuestName,
      reservation?.userName,
      reservation?.UserName,
      reservation?.applicationUser?.fullName,
      reservation?.ApplicationUser?.FullName,
      r?.customerName,
      r?.CustomerName,
      deepFirstString(r, ['fullName', 'guestName', 'userName', 'name']),
      'Guest',
    ),
    requestTime: firstNonEmptyString(
      r?.requestTime,
      r?.RequestTime,
      r?.createdAt,
      r?.CreatedAt,
      reservation?.requestTime,
      reservation?.RequestTime,
      reservation?.createdAt,
      reservation?.CreatedAt,
      r?.reservationStartDate,
      r?.ReservationStartDate,
    ),
    reservationTime: firstNonEmptyString(
      r?.reservationTime,
      r?.ReservationTime,
      r?.reservationStartDate,
      r?.ReservationStartDate,
      r?.time,
      r?.Time,
      r?.startTime,
      r?.StartTime,
      r?.date,
      r?.Date,
      r?.reservationDate,
      r?.ReservationDate,
      r?.reservationDateTime,
      r?.ReservationDateTime,
      reservation?.reservationTime,
      reservation?.ReservationTime,
      reservation?.time,
      reservation?.Time,
      reservation?.startTime,
      reservation?.StartTime,
      reservation?.date,
      reservation?.Date,
      reservation?.reservationDate,
      reservation?.ReservationDate,
      reservation?.reservationDateTime,
      reservation?.ReservationDateTime,
      r?.bookedAt,
      r?.BookedAt,
      reservation?.bookedAt,
      reservation?.BookedAt,
      deepFirstString(r, [
        'reservationTime',
        'startTime',
        'time',
        'date',
        'reservationDate',
        'reservationDateTime',
        'bookedAt',
      ]),
    ),
    guestCount: firstPositiveNumber(
      r?.guestCount,
      r?.GuestCount,
      r?.guestCounts,
      r?.GuestCounts,
      r?.personCount,
      r?.PersonCount,
      r?.peopleCount,
      r?.PeopleCount,
      r?.guestNumber,
      r?.GuestNumber,
      r?.numberOfGuests,
      r?.NumberOfGuests,
      r?.count,
      r?.Count,
      reservation?.guestCount,
      reservation?.GuestCount,
      reservation?.guestCounts,
      reservation?.GuestCounts,
      reservation?.personCount,
      reservation?.PersonCount,
      reservation?.peopleCount,
      reservation?.PeopleCount,
      reservation?.guestNumber,
      reservation?.GuestNumber,
      reservation?.numberOfGuests,
      reservation?.NumberOfGuests,
      reservation?.count,
      reservation?.Count,
      deepFirstPositiveNumber(r, [
        'guestCount',
        'guestCounts',
        'personCount',
        'peopleCount',
        'guestNumber',
        'numberOfGuests',
        'count',
      ]),
      1,
    ),
    status: (firstNonEmptyString(
      r?.approvalStatus,
      r?.ApprovalStatus,
      r?.status,
      r?.Status,
      reservation?.approvalStatus,
      reservation?.ApprovalStatus,
      reservation?.status,
      reservation?.Status,
      'Pending',
    ) as ApprovalStatus),
    phoneNumber: firstNonEmptyString(
      r?.phoneNumber,
      r?.PhoneNumber,
      r?.phone,
      r?.Phone,
      guest?.phoneNumber,
      guest?.PhoneNumber,
      guest?.phone,
      guest?.Phone,
      reservation?.phoneNumber,
      reservation?.PhoneNumber,
      reservation?.phone,
      reservation?.Phone,
    ),
    email: firstNonEmptyString(
      r?.email,
      r?.Email,
      r?.customerEmail,
      r?.CustomerEmail,
      guest?.email,
      guest?.Email,
      reservation?.email,
      reservation?.Email,
    ),
    table: firstNonEmptyString(
      r?.table,
      r?.Table,
      r?.tableType,
      r?.TableType,
      r?.tableName,
      r?.TableName,
      r?.placeName,
      r?.PlaceName,
      reservation?.table,
      reservation?.Table,
      reservation?.tableType,
      reservation?.TableType,
      reservation?.tableName,
      reservation?.TableName,
    ),
    specialRequests: firstNonEmptyString(
      r?.specialRequests,
      r?.SpecialRequests,
      r?.note,
      r?.Note,
      reservation?.specialRequests,
      reservation?.SpecialRequests,
      reservation?.note,
      reservation?.Note,
    ),
  };
};

const getReservationById = async (reservationId: number): Promise<ReservationItem | null> => {
  if (!reservationId) return null;
  try {
    const response = await apiRequest.get('/Reservations/get-by-id', {
      params: { Id: reservationId, id: reservationId },
    });
    const raw = response.data?.Data ?? response.data?.data ?? response.data ?? {};
    return mapReservationItem(raw);
  } catch {
    return null;
  }
};

export const getReservations = async (params?: GetReservationsParams): Promise<ReservationItem[]> => {
  const response = await apiRequest.get('/RestaurantAuth/me/reservations', { params });
  console.log('[Reservations] raw response:', JSON.stringify(response.data).slice(0, 500));
  const raw = response.data?.Data ?? response.data?.data ?? response.data ?? [];
  const list = extractList(raw);
  const mapped: ReservationItem[] = list.map(mapReservationItem);

  const hasMeaningfulData = mapped.some(
    item =>
      item.guestName !== 'Guest' ||
      Boolean(item.reservationTime) ||
      Boolean(item.requestTime) ||
      item.guestCount > 1,
  );

  let enriched = mapped;

  if (mapped.length && !hasMeaningfulData) {
    const enrichTargets = mapped.filter(
      item =>
        item.id > 0 &&
        (item.guestName === 'Guest' ||
          !item.reservationTime ||
          !item.requestTime ||
          item.guestCount <= 1),
    );

    if (enrichTargets.length) {
      const details = await Promise.all(enrichTargets.map(item => getReservationById(item.id)));
      const detailsById = new Map<number, ReservationItem>();
      details.forEach(d => {
        if (d?.id) detailsById.set(d.id, d);
      });

      enriched = mapped.map(item => {
        const detailed = detailsById.get(item.id);
        if (!detailed) return item;
        return {
          ...item,
          guestName: detailed.guestName !== 'Guest' ? detailed.guestName : item.guestName,
          requestTime: detailed.requestTime || item.requestTime,
          reservationTime: detailed.reservationTime || item.reservationTime,
          guestCount: detailed.guestCount > 1 ? detailed.guestCount : item.guestCount,
          phoneNumber: detailed.phoneNumber || item.phoneNumber,
          email: detailed.email || item.email,
          table: detailed.table || item.table,
          specialRequests: detailed.specialRequests || item.specialRequests,
          status: detailed.status || item.status,
        };
      });
    }
  }

  const hasMeaningfulDataAfterEnrich = enriched.some(
    item =>
      item.guestName !== 'Guest' ||
      Boolean(item.reservationTime) ||
      Boolean(item.requestTime) ||
      item.guestCount > 1,
  );

  if (enriched.length && hasMeaningfulDataAfterEnrich) {
    return enriched;
  }

  try {
    const profile = await getProfile();
    const firstRaw = list[0] ?? {};
    const candidateIds = Array.from(
      new Set(
        [
          profile?.id,
          firstRaw?.restaurantId,
          firstRaw?.RestaurantId,
          firstRaw?.reservation?.restaurantId,
          firstRaw?.reservation?.RestaurantId,
        ]
          .map(v => Number(v))
          .filter(v => !Number.isNaN(v) && v > 0),
      ),
    );

    for (const restaurantId of candidateIds) {
      const adminResponse = await apiRequest.get(`/Admin/reservations/restaurant/${restaurantId}`, {
        params,
      });
      const adminRaw =
        adminResponse.data?.Data ?? adminResponse.data?.data ?? adminResponse.data ?? [];
      const adminList = extractList(adminRaw);

      const adminMapped: ReservationItem[] = adminList.map((r: any) => {
        const base = mapReservationItem(r);
        const userName = firstNonEmptyString(
          r?.userName,
          r?.UserName,
          r?.name,
          r?.Name,
          r?.guestName,
          r?.GuestName,
          r?.applicationUser?.name,
          r?.ApplicationUser?.Name,
        );
        const userSurname = firstNonEmptyString(
          r?.userSurname,
          r?.UserSurname,
          r?.surname,
          r?.Surname,
          r?.lastName,
          r?.LastName,
          r?.applicationUser?.surname,
          r?.ApplicationUser?.Surname,
        );
        const fullName = firstNonEmptyString(
          `${userName} ${userSurname}`.trim(),
          userName,
          base.guestName,
        );

        return {
          ...base,
          guestName: fullName || 'Guest',
        };
      });

      const hasAdminMeaningfulData = adminMapped.some(
        item =>
          item.guestName !== 'Guest' ||
          Boolean(item.reservationTime) ||
          Boolean(item.requestTime) ||
          item.guestCount > 1,
      );

      if (adminMapped.length && hasAdminMeaningfulData) {
        return adminMapped;
      }
    }

    return enriched;
  } catch (e) {
    console.log('[Reservations] admin fallback error:', e);
    return enriched;
  }
};

export const acceptReservation = async (reservationId: number) => {
  return apiRequest.patch('/Restaurants/accept-reservation', { reservationId });
};

export const rejectReservation = async (reservationId: number) => {
  return apiRequest.patch('/Restaurants/reject-reservation', { reservationId });
};

export const verifyReservationQrCode = async (payload: { qrCodeId: number; restaurantId: number }): Promise<VerifiedReservationDetails> => {
  const response = await apiRequest.post('/Reservations/verify-qr-code', payload);
  const d = response.data?.Data ?? response.data?.data ?? response.data ?? {};

  return {
    guestName: d.guestName ?? d.GuestName ?? d.userName ?? d.UserName ?? d.name ?? d.Name ?? 'No Name',
    phoneNumber: d.phoneNumber ?? d.PhoneNumber ?? d.phone ?? d.Phone ?? '-',
    email: d.email ?? d.Email ?? '-',
    date: d.date ?? d.Date ?? d.reservationDate ?? d.ReservationDate ?? '',
    time: d.time ?? d.Time ?? d.reservationTime ?? d.ReservationTime ?? '',
    guestCount: d.guestCount ?? d.GuestCount ?? d.personCount ?? d.PersonCount ?? 0,
    table: d.table ?? d.Table ?? d.tableType ?? d.TableType ?? d.tableName ?? d.TableName ?? 'Indoor',
    specialRequests: d.specialRequests ?? d.SpecialRequests ?? d.note ?? d.Note ?? '-',
    status: d.status ?? d.Status ?? d.approvalStatus ?? d.ApprovalStatus ?? 'Confirmed',
  };
};
