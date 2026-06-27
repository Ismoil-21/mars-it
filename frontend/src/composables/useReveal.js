import { onMounted, onBeforeUnmount } from 'vue'

export function useReveal() {
  let observer
  onMounted(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
    document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => observer.observe(el))
  })
  onBeforeUnmount(() => observer && observer.disconnect())
}
