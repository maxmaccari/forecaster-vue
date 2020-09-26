import { mount, shallowMount } from '@vue/test-utils'
import Forecast from '../Forecast.vue'
import ForecastPanel from '../../components/ForecastPanel.vue'
import LoadingPanel from '../../components/LoadingPanel.vue'
import ErrorPanel from '../../components/ErrorPanel.vue'
import flushPromises from 'flush-promises'

const createWrapper = (options: any) => mount(Forecast, {
    global: {
      stubs: ['loading-panel', 'forecast-panel', 'error-panel']
    },
    ...options
  })


describe('Forecast', () => {
  it('renders the view properly', () => {
    const location = 'barcelona'
    const wrapper = shallowMount(Forecast, { props: { location }})

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders ForecastPanel with the given location property', () => {
    const location = 'barcelona'
    const wrapper = createWrapper({ props: { location }})

    const forecastWrapper = wrapper.findComponent(ForecastPanel)

    expect (forecastWrapper.exists()).toBe(true)
    expect (forecastWrapper.props('location')).toBe(location)
  })

  it('renders LoadingPanel if it is loading', () => {
    const location = 'barcelona'
    const wrapper = createWrapper({ props: { location }, global: {
      components: {
        ForecastPanel: {
          async setup() {
            await new Promise(() => {})
            return {}
          }
        }
      },
      stubs: ['loading-panel']
    }})

    const loadingWrapper = wrapper.findComponent(LoadingPanel)
    
    expect (loadingWrapper.exists()).toBe(true)
  })

  it('renders ErrorPanel with the error if it has an error', async () => {
    const error = { message: 'my message' }
    const location = 'barcelona'
    const wrapper = createWrapper({ props: { location }, global: {
      components: {
        ForecastPanel: {
          async setup() {
            await Promise.reject(error)

            return {}
          }
        }
      },
      stubs: ['error-panel', 'loading-panel']
    }})

    await flushPromises()

    const errorWrapper = wrapper.findComponent(ErrorPanel)

    expect (errorWrapper.exists()).toBe(true)
    expect (errorWrapper.props('error')).toEqual(error)
  })
})
