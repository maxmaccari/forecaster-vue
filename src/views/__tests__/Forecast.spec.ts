import { shallowMount } from '@vue/test-utils'
import Forecast from '../Forecast.vue'



describe('Forecast', () => {
  it('renders the view properly', () => {
    const location = 'barcelona'
    const wrapper = shallowMount(Forecast, { props: { location }})

    expect(wrapper.html()).toMatchSnapshot()
  })
})
