<script setup>
defineProps({
  code: { type: String, required: true }, // 'UZ' | 'RU'
  size: { type: [String, Number], default: 20 }
})
</script>

<template>
  <svg
    v-if="code === 'UZ'"
    :width="size" :height="size" viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg" class="shrink-0"
  >
    <defs>
      <clipPath :id="`uz-circle-${size}`">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
    </defs>
    <g :clip-path="`url(#uz-circle-${size})`">
      <!-- base: blue / white / green, 5 equal-ish bands with thin red fimbriations -->
      <rect width="32" height="32" fill="#fff" />
      <rect width="32" height="13.6" y="0"    fill="#0099b5" />
      <rect width="32" height="1.2"  y="13.6" fill="#ce1126" />
      <rect width="32" height="3.4"  y="14.8" fill="#fff" />
      <rect width="32" height="1.2"  y="18.2" fill="#ce1126" />
      <rect width="32" height="12.6" y="19.4" fill="#1eb53a" />

      <!-- crescent + stars sit on the blue stripe, upper-left -->
      <circle cx="7.2" cy="6.2" r="3.1" fill="#fff" />
      <circle cx="8.4" cy="6.2" r="2.6" fill="#0099b5" />
      <g fill="#fff">
        <circle cx="13" cy="3.6" r="0.5" />
        <circle cx="15.4" cy="3.6" r="0.5" />
        <circle cx="17.8" cy="3.6" r="0.5" />
        <circle cx="20.2" cy="3.6" r="0.5" />
        <circle cx="13" cy="6.2" r="0.5" />
        <circle cx="15.4" cy="6.2" r="0.5" />
        <circle cx="17.8" cy="6.2" r="0.5" />
        <circle cx="20.2" cy="6.2" r="0.5" />
        <circle cx="13" cy="8.8" r="0.5" />
        <circle cx="15.4" cy="8.8" r="0.5" />
        <circle cx="17.8" cy="8.8" r="0.5" />
        <circle cx="20.2" cy="8.8" r="0.5" />
      </g>
    </g>
    <circle cx="16" cy="16" r="15.5" fill="none" stroke="rgba(0,0,0,.08)" />
  </svg>

  <svg
    v-else-if="code === 'RU'"
    :width="size" :height="size" viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg" class="shrink-0"
  >
    <defs>
      <clipPath :id="`ru-circle-${size}`">
        <circle cx="16" cy="16" r="16" />
      </clipPath>
    </defs>
    <g :clip-path="`url(#ru-circle-${size})`">
      <rect width="32" height="10.7" y="0" fill="#fff" />
      <rect width="32" height="10.7" y="10.7" fill="#0039a6" />
      <rect width="32" height="10.6" y="21.4" fill="#d52b1e" />
    </g>
    <circle cx="16" cy="16" r="15.5" fill="none" stroke="rgba(0,0,0,.08)" />
  </svg>
</template>
