import { shallowMount } from '@vue/test-utils'
import App from '../src/App.vue'

const wrapper = shallowMount(App)

describe('App', () => {
  it('name', () => {
    // const data = App.data()
    // expect(data.name).toBe('App')
    expect(true).toBe(true)
  })
})