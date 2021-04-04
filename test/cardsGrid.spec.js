import { mount } from '@vue/test-utils'
import CardsGrid from '~/components/CardsGrid.vue'

describe('CardsGrid', () => {
  it('check component existence', () => {
    const wrapper = mount(CardsGrid)
    expect(wrapper.exists()).toBeTruthy()
  })
})
