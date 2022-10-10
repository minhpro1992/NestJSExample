import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Get('/:id')
  async getMessages(@Param('id') id: string) {
    const message = this.messagesService.findOne(id);
    if (!message) throw new NotFoundException('Message not found');
    return message;
  }
  @Post()
  async createMessage(@Body() body: CreateMessageDto) {
    this.messagesService.createMessage(body.content);
  }
}
