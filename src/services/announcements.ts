import { apiRequest } from './apiRequest';

export type AnnouncementStatus = 'active' | 'expired';

export type AnnouncementItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  image: string;
  status: AnnouncementStatus;
  notificationSent?: boolean;
};

const firstNonEmptyString = (...values: any[]): string => {
  for (const v of values) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
};

const firstDefinedValue = (...values: any[]): any => {
  for (const v of values) {
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return undefined;
};

const asBoolean = (...values: any[]): boolean | undefined => {
  for (const v of values) {
    if (typeof v === 'boolean') return v;
    if (typeof v === 'number') return v !== 0;
    if (typeof v === 'string') {
      const normalized = v.trim().toLowerCase();
      if (['true', '1', 'yes', 'sent', 'done'].includes(normalized)) return true;
      if (['false', '0', 'no'].includes(normalized)) return false;
    }
  }
  return undefined;
};

const extractList = (raw: any): any[] => {
  if (Array.isArray(raw)) return raw;
  const data = raw?.Data ?? raw?.data ?? raw;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.Items)) return data.Items;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.Announcements)) return data.Announcements;
  if (Array.isArray(data?.announcements)) return data.announcements;
  if (Array.isArray(data?.List)) return data.List;
  if (Array.isArray(data?.list)) return data.list;
  return [];
};

const asValidDate = (...values: any[]): Date | undefined => {
  for (const v of values) {
    if (!v) continue;
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return undefined;
};

const formatDate = (date?: Date): string => {
  if (!date) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return date.toISOString().slice(0, 10);
  }
};

const formatTime = (date?: Date): string => {
  if (!date) return '';
  try {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  }
};

const mapStatus = (item: any, date?: Date): AnnouncementStatus => {
  const rawStatus = firstNonEmptyString(item?.status, item?.Status, item?.announcementStatus, item?.AnnouncementStatus).toLowerCase();
  if (rawStatus.includes('expire') || rawStatus.includes('inactive') || rawStatus.includes('passive')) {
    return 'expired';
  }
  if (rawStatus.includes('active') || rawStatus.includes('published')) {
    return 'active';
  }

  const isExpired = asBoolean(item?.isExpired, item?.IsExpired, item?.expired, item?.Expired);
  if (typeof isExpired === 'boolean') return isExpired ? 'expired' : 'active';

  if (date && date.getTime() < Date.now()) return 'expired';
  return 'active';
};

const mapAnnouncement = (item: any, index: number): AnnouncementItem => {
  const dateSource = asValidDate(
    item?.announcementDate,
    item?.AnnouncementDate,
    item?.date,
    item?.Date,
    item?.startDate,
    item?.StartDate,
    item?.scheduledAt,
    item?.ScheduledAt,
    item?.createdAt,
    item?.CreatedAt,
    item?.publishDate,
    item?.PublishDate,
  );

  const fallbackDateText = firstNonEmptyString(item?.dateText, item?.DateText);
  const fallbackTimeText = firstNonEmptyString(item?.timeText, item?.TimeText);

  return {
    id: String(firstDefinedValue(item?.id, item?.Id, item?.announcementId, item?.AnnouncementId, `${Date.now()}-${index}`)),
    title: firstNonEmptyString(item?.title, item?.Title, item?.announcementTitle, item?.AnnouncementTitle, item?.name, item?.Name, 'Announcement'),
    description: firstNonEmptyString(item?.description, item?.Description, item?.content, item?.Content, item?.text, item?.Text),
    date: formatDate(dateSource) || fallbackDateText,
    time: formatTime(dateSource) || fallbackTimeText,
    image: firstNonEmptyString(
      item?.imageUrl,
      item?.ImageUrl,
      item?.image,
      item?.Image,
      item?.bannerUrl,
      item?.BannerUrl,
      item?.photoUrl,
      item?.PhotoUrl,
    ),
    status: mapStatus(item, dateSource),
    notificationSent: asBoolean(
      item?.notificationSent,
      item?.NotificationSent,
      item?.isNotificationSent,
      item?.IsNotificationSent,
      item?.isSent,
      item?.IsSent,
    ),
  };
};

export const getAnnouncements = async (): Promise<AnnouncementItem[]> => {
  const response = await apiRequest.get('/Announcements');
  const list = extractList(response.data);
  return list.map(mapAnnouncement);
};

export const updateAnnouncementStatus = async (payload: {
  id: string | number;
  status: AnnouncementStatus;
}): Promise<any> => {
  const response = await apiRequest.put('/Announcements/status', {
    Id: payload.id,
    Status: payload.status === 'active' ? 'Active' : 'Expired',
  });
  return response.data;
};

export const markAnnouncementActive = async (id: string | number): Promise<any> => {
  const response = await apiRequest.put('/Announcements/status', {
    Id: id,
    Status: 'Active',
  });
  return response.data;
};

export const markAnnouncementExpired = async (id: string | number): Promise<any> => {
  const response = await apiRequest.put('/Announcements/status', {
    Id: id,
    Status: 'Expired',
  });
  return response.data;
};

export const deleteAnnouncement = async (id: string | number): Promise<any> => {
  const response = await apiRequest.delete(`/Announcements/${id}`);
  return response.data;
};
