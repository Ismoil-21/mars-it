<script setup>
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import { useDarkMode } from './composables/useDarkMode'
import ConsultationModal from './components/ConsultationModal.vue'
import BranchDetailModal from './components/BranchDetailModal.vue'

useDarkMode()

const lang = ref('UZ')
provide('lang', lang)

const modalOpen    = ref(false)
const modalContext = ref('')

const branchModalOpen  = ref(false)
const activeBranch     = ref(null)
const activeBranchImg  = ref('')

function openBranchModal({ branch, img }) {
  activeBranch.value    = branch
  activeBranchImg.value = img
  branchModalOpen.value = true
}

function closeBranchModal() { branchModalOpen.value = false }

function openConsultFromBranch() {
  branchModalOpen.value = false
  modalContext.value = activeBranch.value
    ? (lang.value === 'RU'
        ? `${activeBranch.value.n}-й Филиал — ${activeBranch.value.nameRU}`
        : `${activeBranch.value.n}-Filial — ${activeBranch.value.nameUZ}`)
    : ''
  modalOpen.value = true
}

provide('openBranchModal', openBranchModal)

function handleClick(e) {
  const el = e.target.closest('.cta-btn')
  if (!el) return
  if (el.hasAttribute('data-skip-modal')) return
  if (el.hasAttribute('data-branch-btn')) return
  if (el.tagName === 'A' || el.closest('a')) return
  e.preventDefault()
  modalContext.value = el.dataset.source || ''
  modalOpen.value = true
}

onMounted(() => document.addEventListener('click', handleClick))
onBeforeUnmount(() => document.removeEventListener('click', handleClick))
</script>

<template>
  <RouterView />
  <ConsultationModal :open="modalOpen" :context="modalContext" @close="modalOpen = false" />
  <BranchDetailModal
    :open="branchModalOpen"
    :branch="activeBranch"
    :branch-img="activeBranchImg"
    @close="closeBranchModal"
    @register="openConsultFromBranch"
  />
</template>
