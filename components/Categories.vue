<template>
  <section>
    <div class="slider-container shadow-md">
      <div class="slider-inner">
        <div
          v-for="category in Object.keys(categories)"
          :key="category"
          class="slider-btn"
          :class="{
            'bg-purple text-white': categoryName === category,
          }"
          @click="filterCategories(category)"
        >
          Category {{ category }}
        </div>
      </div>
    </div>

    <div v-if="loading && !error" class="flex justify-center">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>

    <Message v-else-if="error && !loading" severity="error" :closable="false"
      >{{ error }}
    </Message>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { fromEvent, race, Subscription } from 'rxjs'
import { concatMap, map, takeUntil } from 'rxjs/operators'
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from '@/services/games.services'
import { IGamesCategories } from '~/types/games.types'

@Component({
  watch: {
    storeCategories(categories) {
      ;(this as any).categories = categories
    },
  },
})
export default class Categories extends Vue {
  categories: IGamesCategories = {}
  categoryName: string | null = null
  loading: boolean = false
  error: string | null = null
  mouseSub$: Subscription | null = null

  async created() {
    const storeCategories = this.$store.state.games.categories
    const storeCategoryName = this.$store.state.games.currentCategoryName

    let categoryName
    const categoriesKeys = Object.keys(storeCategories)
    if (categoriesKeys.length > 0) {
      categoryName = storeCategoryName || categoriesKeys[0].toString()
      this.categories = this.$store.state.games.categories
    } else {
      try {
        this.loading = true
        const categorizedGames = await fetchAndCategorizeGames()
        this.categories = categorizedGames
        categoryName = Object.keys(categorizedGames)[0].toString()
        await this.$store.commit('games/setCategories', categorizedGames)
        this.error = null
      } catch (error) {
        this.error = handleAxiosError(error, "Couldn't fetch categories")
      } finally {
        this.loading = false
      }
    }
    // update current category name
    this.categoryName = categoryName
    this.$store.commit('games/setCurrentCategoryName', categoryName)
    this.$store.commit(
      'games/setCurrentCategories',
      this.categories[+categoryName]
    )
  }

  mounted() {
    const innerSlider = document.querySelector('.slider-inner') as any

    const mouseDown$ = fromEvent(innerSlider, 'mousedown')
    const mouseup$ = fromEvent(innerSlider, 'mouseup')
    const mousemove$ = fromEvent(innerSlider, 'mousemove')
    const mouseleave$ = fromEvent(innerSlider, 'mouseleave')
    let startX = 0
    let x = 0
    let scrollLeft = 0

    const slide$ = mouseDown$.pipe(
      concatMap((event: any) => {
        event.preventDefault()
        startX = event.pageX - innerSlider.offsetLeft
        scrollLeft = innerSlider.scrollLeft
        return mousemove$.pipe(
          map((event: any) => {
            x = event.pageX - innerSlider.offsetLeft
            return event
          }),
          takeUntil(race(mouseup$, mouseleave$))
        )
      })
    )
    this.mouseSub$ = slide$.subscribe(() => {
      const slide = x - startX
      innerSlider.scrollLeft = scrollLeft - slide
    })
  }

  destroyed() {
    if (this.mouseSub$) this.mouseSub$.unsubscribe()
  }

  filterCategories(categoryName: string) {
    this.categoryName = categoryName
    this.$store.commit('games/setCurrentCategoryName', categoryName)
    this.$store.commit(
      'games/setCurrentCategories',
      this.categories[categoryName]
    )
  }
}
</script>

<style>
.slider-container {
  width: 100%;
  height: 40px;
  background-color: white;
  overflow: hidden;
}

.slider-inner {
  display: flex;
  overflow-x: scroll;
  padding-bottom: 20px;
}

.slider-btn {
  border: 1px solid gray;
  border-radius: 50px;
  text-align: center;
  margin: 1px 5px;
  min-width: 100px;
  line-height: 25px;
  height: 30px;
  font-size: 14px;
  cursor: pointer;
}
</style>
