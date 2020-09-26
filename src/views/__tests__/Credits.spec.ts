import { shallowMount } from '@vue/test-utils'
import Credits from '../Credits.vue'

describe('Credits', () => {
  it('renders the view properly', () => {
    const wrapper = shallowMount(Credits, {
      global: {
        components: {
          RouterLink: {}
        }
      },
    }) 

    expect(wrapper.html()).toMatchSnapshot()
  })
})
