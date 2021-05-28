import axios from '../utils/axios';

export default class Todos {
  async list() {
    const response = await axios.get('/todos');
    return response;
  }

  async create({ text, done }) {
    const response = await axios.post('/todos', { text, done });
    return response;
  }

  async update({ id, text, done }) {
    const response = await axios.put(`/todos/${id}`, { id, text, done });
    return response;
  }

  async delete({ id }) {
    await axios.delete(`/todos/${id}`);
  }
}
