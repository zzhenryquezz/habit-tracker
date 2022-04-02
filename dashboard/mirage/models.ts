import { belongsTo, hasMany, Model } from 'miragejs'

const models = {
  user: Model.extend({}),
  habit: Model.extend({
    sequences: hasMany('habitSequence'),
  }),
  habitSequence: Model.extend({
    habit: belongsTo('habit'),
    date: new Date(),
  }),
}

export default models
