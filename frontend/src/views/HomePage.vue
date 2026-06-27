<script setup>
import { useReveal } from '../composables/useReveal'

import LangSwitch from '../components/LangSwitch.vue'
import HeroSection from '../components/HeroSection.vue'
import WhoForSection from '../components/WhoForSection.vue'
import CoursesSection from '../components/CoursesSection.vue'
import RocketSection from '../components/RocketSection.vue'
import HowItWorks from '../components/HowItWorks.vue'
import AppSteps from '../components/AppSteps.vue'
import StatsSection from '../components/StatsSection.vue'
import BranchesSection from '../components/BranchesSection.vue'
import TestimonialSection from '../components/TestimonialSection.vue'
import FoundersSection from '../components/FoundersSection.vue'
import FaqSection from '../components/FaqSection.vue'
import ContactCtaSection from '../components/ContactCtaSection.vue'
import AboutMarsSection from '../components/AboutMarsSection.vue'
import SiteFooter from '../components/SiteFooter.vue'

useReveal()
</script>

<template>
  <LangSwitch />
  <HeroSection />
  <WhoForSection />
  <CoursesSection />
  <RocketSection />
  <HowItWorks />
  <AppSteps />
  <StatsSection />
  <TestimonialSection />
  <FoundersSection />
  <BranchesSection />
  <FaqSection />
  <ContactCtaSection />
  <AboutMarsSection />
  <SiteFooter />
</template>
