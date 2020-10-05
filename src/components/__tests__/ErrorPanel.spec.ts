import { shallowMount } from '@vue/test-utils'
import ErrorPanel from '../ErrorPanel.vue'

const createWrapper = (options: object = {}) => {
  return shallowMount(ErrorPanel, {
    props: {
      error: {},
    },
    global: {
      components: {
        RouterLink: {
          name: 'router-link',
          props: ['to'],
        },
      },
    },
    ...options,
  })
}

describe('ErrorPanel', () => {
  it('renders the component properly', () => {
    const wrapper = createWrapper()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the error message if it is a string', () => {
    const error = 'My error message'
    const wrapper = createWrapper({
      props: {
        error,
      },
    })

    expect(wrapper.text()).toContain('Something gone wrong')
    expect(wrapper.text()).toContain(error)
    expect(wrapper.text()).toContain('Click here to try again.')
  })

  it('renders the error message if it is a common object with message', () => {
    const error = { message: 'My error message' }
    const wrapper = createWrapper({
      props: {
        error,
      },
    })

    expect(wrapper.text()).toContain('Something gone wrong')
    expect(wrapper.text()).toContain(error.message)
    expect(wrapper.text()).toContain('Click here to try again.')
  })

  it('renders the error message if it is a error', () => {
    const error = new TypeError('My message')
    const wrapper = createWrapper({
      props: {
        error,
      },
    })

    expect(wrapper.text()).toContain('Something gone wrong')
    expect(wrapper.text()).toContain(error.message)
    expect(wrapper.text()).toContain('Click here to try again.')
  })

  it('renders the error message if it is a 404 error', () => {
    const error = {
      message: 'not found',
      response: {
        status: 404,
      },
    }
    const wrapper = createWrapper({
      props: {
        error,
      },
    })

    expect(wrapper.findComponent({ name: 'router-link' }).exists()).toBe(true)
    expect(wrapper.text()).toContain('Not Found')
    expect(wrapper.text()).toContain('Sorry, the asked city was not found.')
    expect(wrapper.text()).toContain('to try again with another city.')
  })

  it('renders a link to home if it is a 404 error', () => {
    const error = {
      message: 'not found',
      response: {
        status: 404,
      },
    }
    const wrapper = createWrapper({
      props: {
        error,
      },
    })

    const homeLink = wrapper.findComponent({ name: 'router-link' })

    expect(homeLink.exists()).toBe(true)
    expect(homeLink.props('to')).toEqual({ name: 'Home' })
  })

  it('renders the error message if it has other statuses', () => {
    const error = {
      message: 'my message',
      response: {
        status: 500,
      },
    }
    const wrapper = createWrapper({
      props: {
        error,
      },
    })

    expect(wrapper.text()).toContain('Something gone wrong')
    expect(wrapper.text()).toContain(error.message)
  })
})
