import { describe, it, expect } from 'vitest';

import { shallowMount } from '@vue/test-utils'
import VLoadingSpinner from '../VLoadingSpinner.vue'

describe('VLoadingSpinner', () => {
  it('renders the component properly', () => {
    const wrapper = shallowMount(VLoadingSpinner)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
