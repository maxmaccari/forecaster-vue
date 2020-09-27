import { shallowMount, mount } from '@vue/test-utils'
import Forecast from '../Forecast.vue'
import ForecastPanel from '@/components/ForecastPanel.vue'
import flushPromises from 'flush-promises'


describe('Forecast', () => {
  it('renders the view properly', () => {
    const location = 'barcelona'
    const wrapper = shallowMount(Forecast, { props: { location } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders ForecastPanel passing the location and the loaded forecast data as props', async () => {
    const location = 'barcelona'
    const wrapper = mount(Forecast, { 
      props: { location }
    })

    await flushPromises()
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(ForecastPanel).exists()).toBe(true)
  })
})
