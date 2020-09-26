import { shallowMount } from '@vue/test-utils'
import Forecast from '../Forecast.vue'

describe('Forecast', () => {
  it('renders the view properly', () => {
    const wrapper = shallowMount(Forecast, {
      props: {
        location: 'none'
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
