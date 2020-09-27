import { shallowMount } from '@vue/test-utils'
import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders the component properly', () => {
    const wrapper = shallowMount(LoadingSpinner)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
