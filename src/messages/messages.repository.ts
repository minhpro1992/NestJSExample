import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findAll() {
    try {
      const content = await readFile('messages.json', 'utf8');
      const messages = JSON.parse(content);
      return messages;
    } catch (error) {
      return {};
    }
  }
  async findOne(id: string) {
    try {
      const content = await readFile('messages.json', 'utf8');
      const messages = JSON.parse(content);
      return messages[id];
    } catch (error) {
      return {};
    }
  }
  async createMessage(message: string) {
    try {
      const content = await readFile('messages.json', 'utf8');
      const messages = JSON.parse(content);
      const id = Math.floor(Math.random() * 999);
      messages[id] = { id, content: message };
      await writeFile('messages.json', messages);
    } catch (error) {}
  }
}
