import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Drive from '@ioc:Adonis/Core/Drive'
import Application from '@ioc:Adonis/Core/Application'

export default class ClientsController {
  public async show({ response }: HttpContextContract) {
    const path = Application.publicPath('index.html')

    const html = await Drive.get(path)

    return html.toString()
  }
}
