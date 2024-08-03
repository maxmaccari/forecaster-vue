import { describe, it, expect, vi, beforeEach } from 'vitest';

import { shallowMount } from '@vue/test-utils'
import { useRouter } from 'vue-router'
import Home from '../Home.vue'
import { clearCache } from '../../use/forecast'
import router from '../../router/index'

vi.mock('vue-router')
vi.mock('../../use/forecast')

const mockedRouter = {
  ...router,
  push: vi.fn()
}

const createWrapper = (options = {}) => {
  return shallowMount(Home, {
    global: {
      components: {
        RouterLink: {},
        AppLogo: {},
      },
    },
    ...options,
  })
}


describe('Home', () => {
  vi.mocked(useRouter).mockReturnValue(mockedRouter)

  beforeEach(() => {
    vi.mocked(mockedRouter.push).mockReset()
    vi.mocked(clearCache).mockReset()
  })

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

    expect(mockedRouter.push).toBeCalledWith({
      name: 'Forecast',
      params: { location: 'new york' },
    })
  })

  it('clears the forecast cache when it is called', async () => {
    createWrapper()

    expect(clearCache).toBeCalledTimes(1)
  })
})
