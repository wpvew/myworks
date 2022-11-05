import Client from './Client.js';
import { ApiError } from '../utils/ApiError.js';
import { makeClientFromData } from '../utils/makeClientFromData.js';

class ClientService {
  async create(data) {
    const newItem = makeClientFromData(data);
    newItem.createdAt = newItem.updatedAt = new Date().toISOString();
    return await Client(newItem).save();
  }

  async getAll() {
    return await Client.find();
  }

  async getOne(id) {
    if (!id) throw new ApiError(404, 'id not found');
    const client = await Client.findById(id, {name: 1, surname: 1, lastName: 1, contacts: 1 });
    if(!client) throw new ApiError(404, 'Client not found');
    return client;
  }

  async update(client) {
    if (!client._id) throw new ApiError(404, 'id not found');
    const oldData = await Client.findById(client._id);
    const updatedItem = Object.assign(oldData._doc, makeClientFromData({...oldData, ...client}));
    updatedItem.updatedAt = new Date().toISOString();
    return await Client.findByIdAndUpdate(client._id, updatedItem, {new: true});
  }

  async delete(id) {
    if (!id) throw new ApiError(404, 'id not found');
    const client = await Client.findById(id);
    if(!client) throw new ApiError(404, 'Client not found');
    return await Client.findByIdAndDelete(id).lean();
  }
}

export default new ClientService();


