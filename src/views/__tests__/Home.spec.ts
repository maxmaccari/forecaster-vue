import { shallowMount } from '@vue/test-utils'
import Home from '../Home.vue'

const router = {
  push: jest.fn(),
}

const createWrapper = (options = {}) => {
  return shallowMount(Home, {
    global: {
      mocks: { $router: router },
      components: {
        RouterLink: {},
      },
    },
    ...options,
  })
}

describe('Home', () => {
  it('renders the view properly', () => {
    const wrapper = createWrapper()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('disables go button if location is empty', () => {
    const wrapper = createWrapper()

    const goButton = wrapper.find('[data-test-id="goButton"]')
    expect(goButton.element.hasAttribute('disabled')).toBe(true)
  })

  it('enables go button if location is filled', async () => {
    const wrapper = createWrapper()

    const locationInput = wrapper.find('[data-test-id="locationInput"')
    await locationInput.setValue('New York')

    const goButton = wrapper.find('[data-test-id="goButton"]')
    expect(goButton.element.hasAttribute('disabled')).toBe(false)
  })

  it('pushes to Forecast route if go button is pressed with inputted location', async () => {
    const wrapper = createWrapper()

    const locationInput = wrapper.find('[data-test-id="locationInput"')
    await locationInput.setValue('  New York ')

    const locationForm = wrapper.find('[data-test-id="locationForm"]')
    await locationForm.trigger('submit')

    expect(router.push).toBeCalledWith({
      name: 'Forecast',
      params: { location: 'new york' },
    })
  })
})
