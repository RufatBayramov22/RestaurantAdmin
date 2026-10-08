import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, apiRequest, TOKEN_KEY } from './apiRequest';

const ALT_API_BASE_URL = API_BASE_URL.includes('api.dev.yerin.az')
  ? 'https://api.yerin.az/api'
  : 'https://api.dev.yerin.az/api';

const requestWithEnvFallback = async <T = any>(config: {
  method: 'get' | 'post' | 'patch';
  url: string;
  params?: any;
  data?: any;
  headers?: Record<string, string>;
}): Promise<{ data: T }> => {
  try {
    return await apiRequest.request<T>(config);
  } catch (error: any) {
    if (error?.response?.status !== 401) {
      throw error;
    }

    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) throw error;

    return axios.request<T>({
      ...config,
      baseURL: ALT_API_BASE_URL,
      headers: {
        Accept: '*/*',
        ...(config.headers ?? {}),
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000,
    });
  }
};

const pickList = (data: any): any[] => {
  const raw = data?.Data ?? data?.data ?? data ?? [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.Items)) return raw.Items;
  if (Array.isArray(raw?.items)) return raw.items;
  if (Array.isArray(raw?.Messages)) return raw.Messages;
  if (Array.isArray(raw?.messages)) return raw.messages;
  if (Array.isArray(raw?.Conversations)) return raw.Conversations;
  if (Array.isArray(raw?.conversations)) return raw.conversations;
  return [];
};

const asNumber = (...vals: any[]): number | undefined => {
  for (const v of vals) {
    if (typeof v === 'number') return v;
    if (typeof v === 'string' && v.trim() !== '' && !Number.isNaN(Number(v))) return Number(v);
  }
  return undefined;
};

export type RecentChatUser = {
  partnerUserId?: number;
  partnerRestaurantId?: number;
  guestName: string;
  lastMessage: string;
  lastMessageTime?: string;
  unreadCount: number;
  avatarUrl?: string;
};

export type ConversationMessage = {
  id: number;
  content: string;
  createdAt?: string;
  isRead: boolean;
  fromMe: boolean;
  audioUrl?: string;
  audioDurationSeconds?: number;
};

export const getRecentUsers = async (params?: {
  PageNumber?: number;
  PageSize?: number;
  UserName?: string;
  Username?: string;
  Search?: string;
  SearchText?: string;
}): Promise<RecentChatUser[]> => {
  const response = await requestWithEnvFallback({
    method: 'get',
    url: '/Messages/recent-users',
    params,
  });
  const list = pickList(response.data);

  return list.map((u: any): RecentChatUser => ({
    partnerUserId: asNumber(
      u.partnerUserId,
      u.PartnerUserId,
      u.partnerApplicationUserId,
      u.PartnerApplicationUserId,
      u.applicationUserId,
      u.ApplicationUserId,
      u.customerId,
      u.CustomerId,
      u.senderUserId,
      u.SenderUserId,
      u.receiverUserId,
      u.ReceiverUserId,
      u.userId,
      u.UserId,
      u.id,
      u.Id,
    ),
    partnerRestaurantId: asNumber(
      u.partnerRestaurantId,
      u.PartnerRestaurantId,
      u.senderRestaurantId,
      u.SenderRestaurantId,
      u.receiverRestaurantId,
      u.ReceiverRestaurantId,
      u.restaurantId,
      u.RestaurantId,
      u.targetRestaurantId,
      u.TargetRestaurantId,
    ),
    guestName:
      u.userFullName ??
      u.UserFullName ??
      u.fullName ??
      u.FullName ??
      u.userName ??
      u.UserName ??
      u.name ??
      u.Name ??
      'Guest',
    lastMessage: u.lastMessage ?? u.LastMessage ?? u.content ?? u.Content ?? '',
    lastMessageTime: u.lastMessageTime ?? u.LastMessageTime ?? u.createdAt ?? u.CreatedAt,
    unreadCount: asNumber(u.unreadCount, u.UnreadCount, u.unreadMessages, u.UnreadMessages) ?? 0,
    avatarUrl: u.avatarUrl ?? u.AvatarUrl ?? u.profileImageUrl ?? u.ProfileImageUrl ?? u.imageUrl ?? u.ImageUrl,
  }));
};

export const getRecentRestaurants = async (params?: {
  PageNumber?: number;
  PageSize?: number;
}): Promise<RecentChatUser[]> => {
  const response = await requestWithEnvFallback({
    method: 'get',
    url: '/Messages/recent-restaurants',
    params,
  });
  const list = pickList(response.data);

  return list.map((u: any): RecentChatUser => ({
    partnerUserId: asNumber(
      u.partnerUserId,
      u.PartnerUserId,
      u.partnerApplicationUserId,
      u.PartnerApplicationUserId,
      u.applicationUserId,
      u.ApplicationUserId,
      u.customerId,
      u.CustomerId,
      u.senderUserId,
      u.SenderUserId,
      u.receiverUserId,
      u.ReceiverUserId,
      u.userId,
      u.UserId,
    ),
    partnerRestaurantId: asNumber(
      u.partnerRestaurantId,
      u.PartnerRestaurantId,
      u.senderRestaurantId,
      u.SenderRestaurantId,
      u.receiverRestaurantId,
      u.ReceiverRestaurantId,
      u.restaurantId,
      u.RestaurantId,
      u.targetRestaurantId,
      u.TargetRestaurantId,
      u.id,
      u.Id,
    ),
    guestName:
      u.restaurantName ??
      u.RestaurantName ??
      u.name ??
      u.Name ??
      u.userFullName ??
      u.UserFullName ??
      'Guest',
    lastMessage: u.lastMessage ?? u.LastMessage ?? u.content ?? u.Content ?? '',
    lastMessageTime: u.lastMessageTime ?? u.LastMessageTime ?? u.createdAt ?? u.CreatedAt,
    unreadCount: asNumber(u.unreadCount, u.UnreadCount, u.unreadMessages, u.UnreadMessages) ?? 0,
    avatarUrl:
      u.avatarUrl ??
      u.AvatarUrl ??
      u.logoUrl ??
      u.LogoUrl ??
      u.imageUrl ??
      u.ImageUrl,
  }));
};

export const getConversation = async (params: {
  PartnerUserId?: number;
  PartnerRestaurantId?: number;
  PageNumber?: number;
  PageSize?: number;
}): Promise<ConversationMessage[]> => {
  const userId = params.PartnerUserId;
  const restaurantId = params.PartnerRestaurantId;

  const queryVariants: Array<{ PartnerUserId?: number; PartnerRestaurantId?: number; PageNumber?: number; PageSize?: number }> = [
    {
      PartnerUserId: userId,
      PartnerRestaurantId: restaurantId,
      PageNumber: params.PageNumber,
      PageSize: params.PageSize,
    },
    {
      PartnerUserId: userId,
      PageNumber: params.PageNumber,
      PageSize: params.PageSize,
    },
    {
      PartnerRestaurantId: restaurantId,
      PageNumber: params.PageNumber,
      PageSize: params.PageSize,
    },
    {
      // Some backend payloads send only one partner id type; try the same id as restaurant id
      PartnerRestaurantId: restaurantId ?? userId,
      PageNumber: params.PageNumber,
      PageSize: params.PageSize,
    },
    {
      // Some backend payloads send only one partner id type; try the same id as user id
      PartnerUserId: userId ?? restaurantId,
      PageNumber: params.PageNumber,
      PageSize: params.PageSize,
    },
  ];

  let list: any[] = [];
  let lastError: any;

  for (const variant of queryVariants) {
    if (!variant.PartnerUserId && !variant.PartnerRestaurantId) {
      continue;
    }

    try {
      const response = await requestWithEnvFallback({
        method: 'get',
        url: '/Messages/conversation',
        params: variant,
      });
      let picked = pickList(response.data);

      // Extra fallback for uncommon wrappers
      if (!picked.length) {
        const raw = response.data?.Data ?? response.data?.data ?? response.data ?? {};
        const one = raw?.conversation ?? raw?.Conversation ?? raw?.message ?? raw?.Message;
        if (Array.isArray(one)) picked = one;
      }

      if (picked.length) {
        list = picked;
        break;
      }
      if (!list.length) {
        list = picked;
      }
    } catch (e) {
      lastError = e;
    }
  }

  if (!list.length && lastError) {
    throw lastError;
  }

  return list.map((m: any): ConversationMessage => {
    const fromMeRaw = m.fromMe ?? m.FromMe ?? m.isMine ?? m.IsMine;
    const senderRestaurantId = asNumber(m.senderRestaurantId, m.SenderRestaurantId);

    return {
      id: asNumber(m.id, m.Id) ?? Date.now(),
      content: m.content ?? m.Content ?? '',
      createdAt: m.createdAt ?? m.CreatedAt ?? m.sentAt ?? m.SentAt,
      isRead: Boolean(m.isRead ?? m.IsRead ?? m.read ?? m.Read),
      fromMe: typeof fromMeRaw === 'boolean' ? fromMeRaw : Boolean(senderRestaurantId),
      audioUrl:
        m.audioFileUrl ??
        m.AudioFileUrl ??
        m.audioUrl ??
        m.AudioUrl ??
        m.voiceUrl ??
        m.VoiceUrl ??
        m.fileUrl ??
        m.FileUrl,
      audioDurationSeconds: asNumber(
        m.audioDurationSeconds,
        m.AudioDurationSeconds,
        m.durationSeconds,
        m.DurationSeconds,
        m.duration,
        m.Duration,
      ),
    };
  });
};

export const sendMessageToUser = async (payload: {
  ReceiverUserId?: number;
  ReceiverRestaurantId?: number;
  Content?: string;
  AudioFile?: { uri: string; name?: string; type?: string };
}) => {
  const formData = new FormData();
  if (payload.ReceiverUserId != null) {
    formData.append('ReceiverUserId', String(payload.ReceiverUserId));
  }
  if (payload.ReceiverRestaurantId != null) {
    formData.append('ReceiverRestaurantId', String(payload.ReceiverRestaurantId));
  }
  if (payload.Content != null) {
    formData.append('Content', payload.Content);
  }
  if (payload.AudioFile?.uri) {
    formData.append('AudioFile', {
      uri: payload.AudioFile.uri,
      name: payload.AudioFile.name ?? 'voice-message.m4a',
      type: payload.AudioFile.type ?? 'audio/m4a',
    } as any);
  }

  return requestWithEnvFallback({
    method: 'post',
    url: '/Messages',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const markMessageAsRead = async (messageId: number) => {
  return requestWithEnvFallback({
    method: 'patch',
    url: '/Messages/read',
    data: { messageId },
  });
};
