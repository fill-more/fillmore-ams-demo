import { getSupabaseClient } from './supabaseClient';
import type { Tables } from './types/supabase';
import type {
  UserAchievement,
  UserProfile,
  TaskStage,
  Task,
  TaskType,
  ChatRoom,
  Instruction,
} from './types/common';

const supabase = getSupabaseClient();

type ProfileRow = Tables<'profiles'>;
type BuddyRow = Tables<'buddies'>;

const SYSTEM_MESSAGE_SENDER = {
  id: 'system',
  firstName: 'System',
  lastName: 'Message',
  profileImageUrl: null,
};

export async function login(
  email: string,
  password: string,
  expectedRole?: 'educator' | 'learner'
) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  // Check user role if expectedRole is specified
  if (data.user && expectedRole) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    if (profile?.role !== expectedRole) {
      await supabase.auth.signOut();
      throw new Error(`Only ${expectedRole}s can access this application`);
    }
  }

  return data;
}

export async function fetchUserProfiles(): Promise<UserProfile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;

  return (data ?? []).map(
    (profile: ProfileRow) =>
      ({
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        role: profile.role,
        profileImageUrl: profile.profile_image_url,
        background: profile.background,
        branch: profile.branch,
        rank: profile.rank,
        level: profile.level,
        experiencePoints: profile.experience_points,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
      }) as UserProfile
  );
}

export async function fetchBuddyIdsByUserId(userId: string): Promise<string[]> {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from('buddies')
    .select('buddy_id')
    .eq('user_id', userId);

  if (error) throw error;

  return (data ?? []).map((row: Pick<BuddyRow, 'buddy_id'>) => row.buddy_id);
}

export async function fetchCurrentUser(): Promise<UserProfile | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;

  return {
    id: data.id,
    firstName: data.first_name,
    lastName: data.last_name,
    role: data.role,
    profileImageUrl: data.profile_image_url,
    background: data.background,
    branch: data.branch,
    rank: data.rank,
    level: data.level,
    experiencePoints: data.experience_points,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  } as UserProfile;
}

export async function fetchAchievementsByUserId(
  userId: string
): Promise<UserAchievement[]> {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from('user_achievements')
    .select(
      `progress, is_achieved, achievements:achievements (id, name, description, icon_url, required_count)`
    )
    .eq('user_id', userId);

  if (error) throw error;

  return (data ?? []).map(
    (row) =>
      ({
        id: row.achievements.id,
        name: row.achievements.name,
        description: row.achievements.description,
        iconUrl: row.achievements.icon_url,
        requiredCount: row.achievements.required_count,
        progress: row.progress,
        isAchieved: row.is_achieved,
      }) as UserAchievement
  );
}

export async function fetchTaskStagesByTaskType(
  taskType: string
): Promise<TaskStage[]> {
  const { data, error } = await supabase
    .from('stages')
    .select('*')
    .eq('task_type', taskType)
    .order('order_index', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((stage) => ({
    id: stage.id,
    label: stage.label,
    orderIndex: stage.order_index,
    stageCode: stage.stage_code,
    taskType: stage.task_type as TaskType,
  }));
}

export async function fetchTasksByStageId(stageId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('stage_id', stageId)
    .order('order_index', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((task) => ({
    id: task.id,
    label: task.label,
    description: task.description,
    orderIndex: task.order_index,
    percentLeft: task.percent_left || 0,
    percentTop: task.percent_top || 0,
    stageId: task.stage_id,
  }));
}

export async function fetchChatRoomsByUserId(
  userId: string
): Promise<ChatRoom[]> {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from('chatroom_participants')
    .select(
      `
      chatrooms:chatroom_id (
        id,
        is_announcement,
        created_at,
        chatroom_participants!inner (
          user_id,
          user:user_id (
            id,
            first_name,
            last_name,
            profile_image_url
          )
        ),
        messages (
          id,
          content,
          created_at
        )
      )
    `
    )
    .eq('user_id', userId);

  if (error) throw error;

  return (data ?? [])
    .map((row) => row.chatrooms)
    .filter(Boolean)
    .map((chatroom) => {
      const otherParticipant = chatroom.chatroom_participants?.find(
        (p) => p.user_id !== userId
      );

      const lastMessage = chatroom.messages?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];

      return {
        id: chatroom.id,
        isAnnouncement: chatroom.is_announcement,
        createdAt: chatroom.created_at,
        otherParticipant: otherParticipant?.user
          ? {
              id: otherParticipant.user.id,
              firstName: otherParticipant.user.first_name,
              lastName: otherParticipant.user.last_name,
              profileImageUrl: otherParticipant.user.profile_image_url,
            }
          : null,
        lastMessage: lastMessage
          ? {
              content: lastMessage.content,
              createdAt: lastMessage.created_at,
            }
          : null,
      };
    });
}

export async function fetchMessagesByChatroomId(chatroomId: string) {
  if (!chatroomId) {
    return [];
  }

  const { data, error } = await supabase
    .from('messages')
    .select(
      `
      id,
      content,
      created_at,
      sender:sender_id (
        id,
        first_name,
        last_name,
        profile_image_url
      )
    `
    )
    .eq('chatroom_id', chatroomId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  return (data ?? []).map((message) => ({
    id: message.id,
    content: message.content,
    createdAt: message.created_at,
    sender: message.sender
      ? {
          id: message.sender.id,
          firstName: message.sender.first_name,
          lastName: message.sender.last_name,
          profileImageUrl: message.sender.profile_image_url,
        }
      : SYSTEM_MESSAGE_SENDER,
  }));
}

export async function sendUserMessage(
  chatroomId: string,
  senderId: string,
  content: string
) {
  if (!chatroomId || !senderId || !content.trim()) {
    throw new Error('Missing required fields for sending message');
  }

  const { data, error } = await supabase
    .from('messages')
    .insert({
      chatroom_id: chatroomId,
      sender_id: senderId,
      content: content.trim(),
      type: 'user',
    })
    .select(
      `
      id,
      content,
      created_at,
      sender:sender_id (
        id,
        first_name,
        last_name,
        profile_image_url
      )
    `
    )
    .single();

  if (error) throw error;

  return {
    id: data.id,
    content: data.content,
    createdAt: data.created_at,
    sender: data.sender
      ? {
          id: data.sender.id,
          firstName: data.sender.first_name,
          lastName: data.sender.last_name,
          profileImageUrl: data.sender.profile_image_url,
        }
      : SYSTEM_MESSAGE_SENDER,
  };
}

export async function fetchInstructionByType(
  type: string
): Promise<Instruction | null> {
  if (typeof type !== 'string' || type.trim() === '') {
    return null;
  }

  const { data, error } = await supabase
    .from('instructions')
    .select('*')
    .eq('type', type)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    type: data.type,
    version: data.version,
    isActive: data.is_active ?? false,
    createdAt: data.created_at ?? '',
    updatedAt: data.updated_at ?? '',
  };
}
