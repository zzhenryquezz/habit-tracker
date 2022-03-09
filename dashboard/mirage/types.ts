import { Registry as BaseRegistry } from 'miragejs'
import BaseSchema from 'miragejs/orm/schema'
import factories from './factories'
import models from './models'

export interface Registry extends BaseRegistry<typeof models, typeof factories> {}

export interface Schema extends BaseSchema<Registry> {}
