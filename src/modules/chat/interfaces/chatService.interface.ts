import { MessageEntity } from "../entities/messages.entity";
import { ConversationEntity } from "../entities/conversations.entity";
import { SocketDeviceEntity } from "../entities/socketDevices.entity";

import { ConnectChatDto } from "../dto/connectChat.dto";
import { SendMessageDto } from "../dto/sendMessage.dto";
import { CreateDeviceDto } from "../dto/createDevice.dto";
import { ResponseDto } from "../../../common/response.dto";

import {
  IConversationMessage,
  IUserFriend,
  IMessage,
} from "./chatRepository.interface";

export interface IChatService {
  getConversationByUserIdAndFriendId(
    userId: string,
    friendId: string
  ): Promise<ResponseDto<ConversationEntity | null>>;
  getConversationByUserId(
    friendId: string
  ): Promise<ResponseDto<IConversationMessage[] | null>>;
  getFriendByConversationId(
    conversationId: string
  ): Promise<ResponseDto<IUserFriend | null>>;
  getMessagesByConversationId(
    conversationId: string
  ): Promise<ResponseDto<IMessage[] | null>>;
  getSocketDeviceByConversationId(
    conversationId: string
  ): Promise<ResponseDto<SocketDeviceEntity[] | null>>;
  getSocketDeviceByConversationIdAndUserId(
    conversationId: string,
    userId: string
  ): Promise<ResponseDto<SocketDeviceEntity | null>>;

  createConversation(
    conversation: ConnectChatDto
  ): Promise<ResponseDto<ConversationEntity | null>>;
  createMessage(
    message: SendMessageDto
  ): Promise<ResponseDto<MessageEntity | null>>;
  createSocketDevice(
    device: CreateDeviceDto
  ): Promise<ResponseDto<SocketDeviceEntity | null>>;

  updateSocketDevice(
    device: CreateDeviceDto
  ): Promise<ResponseDto<boolean | null>>;

  deleteSocketDevice(socketId: string): Promise<ResponseDto<boolean | null>>;
  deleteConversation(
    userId: string,
    friendId: string
  ): Promise<ResponseDto<boolean | null>>;
}