import { shallowMount } from '@vue/test-utils'
import Forecast from '../Forecast.vue'

describe('Forecast', () => {
  it('renders the view properly', () => {
    const wrapper = shallowMount(Forecast) 

    expect(wrapper.html()).toMatchSnapshot()
  })
})
