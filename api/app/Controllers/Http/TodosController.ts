import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({}: HttpContextContract) {
    const todos = await Todo.query().orderBy('id')
    return todos
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['text', 'done'])
    const todo = await Todo.create(data)
    return todo
  }

  public async show({ params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    return todo
  }

  public async update({ request, params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    const data = await request.only(['text', 'done'])

    todo.merge(data)

    await todo.save()

    return todo
  }

  public async destroy({ params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
  }
}
