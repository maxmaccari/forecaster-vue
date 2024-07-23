import { describe, it, expect } from 'vitest';

import { shallowMount } from '@vue/test-utils'
import LoadingPanel from '../LoadingPanel.vue'

describe('LoadingPanel', () => {
  it('renders the component properly', () => {
    const wrapper = shallowMount(LoadingPanel)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
